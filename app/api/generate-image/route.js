import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


const ALLOWED_USER_IDS = ["user_322onA61wkEzMrlIUU9KCH4ENJb", "user_322nwjzRThZzflFbg1ofs1e3Etc"]; 

export async function POST(request) {
  try {
    const { prompt, uploadedImage, userId } = await request.json();

    // 🔒 Access control
    if (!userId || !ALLOWED_USER_IDS.includes(userId)) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    if (!prompt && !uploadedImage) {
      return NextResponse.json(
        { error: "Either prompt or uploaded image is required" },
        { status: 400 }
      );
    }

    let contents;

    if (uploadedImage && prompt) {
      // Image + Text generation
      const base64Data = uploadedImage.split(",")[1];
      contents = [
        {
          role: "user",
          parts: [
            {
              text: `Create a realistic, photo-like YouTube thumbnail based on this image with the following requirements: ${prompt}. 
Make it professional and cinematic, with sharp details, vibrant colors, and bold text overlays (preferably white or high-contrast). 
Ensure it looks like a real thumbnail shot, not an AI-generated illustration. Optimized for 1280x720 resolution, dramatic lighting, and strong subject focus.`,
            },
            {
              inlineData: {
                mimeType: uploadedImage.split(";")[0].split(":")[1],
                data: base64Data,
              },
            },
          ],
        },
      ];
    } else {
      // Text-only generation
      contents = `Create a realistic, photo-like YouTube thumbnail based on this idea: ${prompt}.

Thumbnail requirements:
- Looks like a real photo, not AI-generated or cartoonish
- Professional, cinematic quality with sharp details
- Eye-catching layout optimized for 1280x720 resolution
- Strong contrast and vibrant colors
- Bold, readable text in white or other high-contrast colors
- Clear subject focus with dramatic lighting/shadows
- Designed to grab attention and maximize clicks`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: contents,
    });

    // Find the image part in the response
    let imageBase64 = null;
    let textResponse = null;

    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        textResponse = part.text;
      } else if (part.inlineData) {
        imageBase64 = part.inlineData.data;
        break;
      }
    }

    if (!imageBase64) {
      return NextResponse.json(
        { error: "No image generated in response" },
        { status: 500 }
      );
    }

    // Optional: Save image to public folder for serving
    const timestamp = Date.now();
    const fileName = `thumbnail-${timestamp}.png`;
    const filePath = join(process.cwd(), "public", "generated", fileName);

    try {
      const buffer = Buffer.from(imageBase64, "base64");
      await writeFile(filePath, buffer);
    } catch (fileError) {
      console.warn("Could not save file to public folder:", fileError.message);
      // Continue without saving - we'll return base64 data
    }

    return NextResponse.json({
      success: true,
      imageData: `data:image/png;base64,${imageBase64}`,
      imageUrl: `/generated/${fileName}`,
      prompt: prompt,
      textResponse: textResponse,
      timestamp: timestamp,
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to generate image", details: error.message },
      { status: 500 }
    );
  }
}
