import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI();


const ALLOWED_USER_IDS = ["user_322onA61wkEzMrlIUU9KCH4ENJb", "user_322nwjzRThZzflFbg1ofs1e3Etc"]; 

export async function POST(request) {
  try {
    const { prompt, scene, lighting, mood, style, colors, additional, userId } =
      await request.json();

    // 🔒 Access control
    if (!userId || !ALLOWED_USER_IDS.includes(userId)) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Build structured enhancement details
    const enhancementDetails = `
Original Prompt: "${prompt}"

Enhancement Preferences:
- Scene: ${scene || "Not specified"}
- Lighting: ${lighting || "Not specified"}
- Mood: ${mood || "Not specified"}
- Style: ${style || "Not specified"}
- Colors: ${colors || "Not specified"}
- Additional Notes: ${additional || "None"}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5", 
      messages: [
        {
          role: "system",
          content: `You are an expert at enhancing thumbnail generation prompts.
    Your task is to transform user input into concise, visually descriptive prompts 
    that produce realistic, photo-like thumbnails (not artificial or cartoonish).
    Always emphasize professional, sharp imagery with clear focus and high contrast.
    Ensure the thumbnail includes bold, attention-grabbing text in white or other 
    contrasting colors that stand out against the background.`,
        },
        {
          role: "user",
          content: `Enhance this thumbnail generation prompt using the given preferences:\n\n${enhancementDetails}`,
        },
      ],
    });


    const enhancedPrompt = completion.choices[0]?.message?.content?.trim();

    return NextResponse.json({
      originalPrompt: prompt,
      enhancedPrompt,
      success: true,
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to enhance prompt", details: error.message },
      { status: 500 }
    );
  }
}
