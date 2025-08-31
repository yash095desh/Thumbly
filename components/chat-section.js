"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Image,
  Upload,
  Loader2,
  Sparkles,
  Download,
  Heart,
  Edit3,
  X,
  Plus,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@clerk/nextjs";

// Reusable Modal
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

// Enhance Prompt Modal
const EnhanceModal = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    scene: "",
    lighting: "",
    mood: "",
    style: "",
    colors: "",
    additional: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          Enhance Your Prompt
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Scene/Subject
            </label>
            <input
              type="text"
              placeholder="e.g., futuristic city, mountain view..."
              value={formData.scene}
              onChange={(e) => handleInputChange("scene", e.target.value)}
              className="w-full p-2 border rounded-md bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Lighting</label>
            <select
              className="w-full p-2 border rounded-md bg-background"
              value={formData.lighting}
              onChange={(e) => handleInputChange("lighting", e.target.value)}
            >
              <option value="">Select lighting...</option>
              <option value="bright">Bright & Vibrant</option>
              <option value="dramatic">Dramatic Shadows</option>
              <option value="neon">Neon Glow</option>
              <option value="natural">Natural Light</option>
              <option value="cinematic">Cinematic</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Mood/Atmosphere
            </label>
            <select
              className="w-full p-2 border rounded-md bg-background"
              value={formData.mood}
              onChange={(e) => handleInputChange("mood", e.target.value)}
            >
              <option value="">Select mood...</option>
              <option value="energetic">Energetic & Exciting</option>
              <option value="mysterious">Mysterious</option>
              <option value="epic">Epic & Heroic</option>
              <option value="fun">Fun & Playful</option>
              <option value="serious">Serious & Professional</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Visual Style
            </label>
            <select
              className="w-full p-2 border rounded-md bg-background"
              value={formData.style}
              onChange={(e) => handleInputChange("style", e.target.value)}
            >
              <option value="">Select style...</option>
              <option value="photorealistic">Photorealistic</option>
              <option value="cartoon">Cartoon/Animated</option>
              <option value="minimalist">Minimalist</option>
              <option value="retro">Retro/Vintage</option>
              <option value="futuristic">Futuristic</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Color Scheme
            </label>
            <input
              type="text"
              placeholder="e.g., blue/orange, vibrant rainbow..."
              value={formData.colors}
              onChange={(e) => handleInputChange("colors", e.target.value)}
              className="w-full p-2 border rounded-md bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Additional Details
            </label>
            <Textarea
              placeholder="Any other specific requirements?"
              value={formData.additional}
              onChange={(e) => handleInputChange("additional", e.target.value)}
              className="h-16 resize-none"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
              ) : (
                <Sparkles className="w-4 h-4 mr-1" />
              )}
              Enhance Prompt
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const EditModal = ({ isOpen, onClose, message, onSave, isLoading }) => {
  const [editPrompt, setEditPrompt] = useState("");

  useEffect(() => {
    if (message) {
      setEditPrompt(message.originalPrompt || message.prompt);
    }
  }, [message]);

  const handleSubmit = () => {
    onSave(editPrompt);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-blue-500" />
            Edit Prompt
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {message?.uploadedFile && (
            <div className="mb-3">
              <img
                src={message.uploadedFile.url}
                alt="Original"
                className="max-w-full h-32 rounded-lg object-cover"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Original image: {message.uploadedFile.name}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">
              Edit Your Prompt
            </label>
            <textarea
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              className="w-full min-h-24 p-2 border rounded-md bg-background resize-none"
              placeholder="Describe your thumbnail idea..."
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSubmit}
              disabled={isLoading || !editPrompt.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-md flex items-center justify-center gap-1"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Edit3 className="w-4 h-4" />
              )}
              Regenerate
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-md bg-background hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default function ChatThumbnailGenerator() {
  const {user} = useUser();
  const [inputPrompt, setInputPrompt] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showEnhanceModal, setShowEnhanceModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const demoPrompts = [
    {
      category: "Gaming",
      prompt:
        "Epic gaming battle scene with futuristic weapons, neon lighting, and intense action, perfect for a gaming channel thumbnail",
    },
    {
      category: "Tech Review",
      prompt:
        "Modern tech workspace with latest gadgets, clean minimalist design, and professional lighting for tech review content",
    },
    {
      category: "Travel Vlog",
      prompt:
        "Breathtaking mountain landscape at sunset with traveler silhouette, vibrant colors, and adventure spirit for travel vlogs",
    },
    {
      category: "Food/Cooking",
      prompt:
        "Delicious gourmet dish with steam rising, warm kitchen lighting, and chef's hands for cooking channel thumbnail",
    },
    {
      category: "Fitness",
      prompt:
        "Dynamic workout scene with energetic athlete, gym environment, and motivational atmosphere for fitness content",
    },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleGenerate = async (useEnhanced = false) => {
    if (!inputPrompt.trim() && !uploadedFile) return;

    setIsGenerating(true);

    let finalPrompt = inputPrompt;

    try {
      // Step 1: Enhance prompt if requested
      if (useEnhanced && inputPrompt.trim()) {
        const enhanceResponse = await fetch("/api/enhance-prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: inputPrompt, userId: user.id }),
        });

        if (enhanceResponse.ok) {
          const enhanceData = await enhanceResponse.json();
          finalPrompt = enhanceData.enhancedPrompt;
        } else {
          console.error("Failed to enhance prompt");
          // Continue with original prompt
        }
      }

      // Add user message to conversation
      const userMessage = {
        id: Date.now(),
        type: "user",
        prompt: finalPrompt,
        originalPrompt: inputPrompt,
        uploadedFile: uploadedFile,
        timestamp: new Date(),
        wasEnhanced: useEnhanced,
      };

      setConversation((prev) => [...prev, userMessage]);

      // Step 2: Generate image using Gemini
      const generateResponse = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: finalPrompt,
          uploadedImage: uploadedFile?.url || null,
          userId: user.id
        }),
      });

      if (generateResponse.ok) {
        const generateData = await generateResponse.json();

        const aiMessage = {
          id: Date.now() + 1,
          type: "ai",
          prompt: finalPrompt,
          originalPrompt: inputPrompt,
          uploadedFile: uploadedFile,
          generatedImage: generateData.imageData,
          timestamp: new Date(),
          liked: false,
          wasEnhanced: useEnhanced,
          textResponse: generateData.textResponse,
        };

        setConversation((prev) => [...prev, aiMessage]);
      } else {
        const errorData = await generateResponse.json();
        console.error("Failed to generate image:", errorData);

        // Add error message to conversation
        const errorMessage = {
          id: Date.now() + 1,
          type: "error",
          message: `Failed to generate image: ${errorData.error}`,
          timestamp: new Date(),
        };

        setConversation((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Generation error:", error);

      // Add error message to conversation
      const errorMessage = {
        id: Date.now() + 1,
        type: "error",
        message: `An error occurred: ${error.message}`,
        timestamp: new Date(),
      };

      setConversation((prev) => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
      setInputPrompt("");
      setUploadedFile(null);
      setShowFileUpload(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedFile({
          name: file.name,
          url: e.target.result,
          type: file.type,
        });
        setShowFileUpload(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhanceSubmit = async (formData) => {
    setIsEnhancing(true);

    try {
      const enhanceResponse = await fetch("/api/enhance-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: inputPrompt,
          scene: formData.scene,
          lighting: formData.lighting,
          mood: formData.mood,
          style: formData.style,
          colors: formData.colors,
          additional: formData.additional,
          userId: user?.id
        }),
      });

      if (enhanceResponse.ok) {
        const enhanceData = await enhanceResponse.json();
        setInputPrompt(enhanceData.enhancedPrompt);
        setShowEnhanceModal(false);
      } else {
        console.error("Failed to enhance prompt");
      }
    } catch (error) {
      console.error("Enhancement error:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleEdit = (message) => {
    setEditingMessage(message);
    setShowEditModal(true);
  };

  const handleEditSave = async (newPrompt) => {
    if (!newPrompt.trim()) return;

    setIsGenerating(true);

    try {
      // Generate new image with edited prompt
      const generateResponse = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: newPrompt,
          uploadedImage: editingMessage.uploadedFile?.url || null,
          userId: user.id
        }),
      });

      if (generateResponse.ok) {
        const generateData = await generateResponse.json();

        const updatedMessage = {
          ...editingMessage,
          prompt: newPrompt,
          originalPrompt: newPrompt,
          generatedImage: generateData.imageData,
          timestamp: new Date(),
          textResponse: generateData.textResponse,
        };

        setConversation((prev) =>
          prev.map((msg) =>
            msg.id === editingMessage.id ? updatedMessage : msg
          )
        );
      } else {
        const errorData = await generateResponse.json();
        console.error("Failed to regenerate image:", errorData);
      }
    } catch (error) {
      console.error("Edit generation error:", error);
    } finally {
      setIsGenerating(false);
      setShowEditModal(false);
      setEditingMessage(null);
    }
  };

  const toggleLike = (id) => {
    setConversation((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, liked: !msg.liked } : msg))
    );
  };

  const removeFile = () => {
    setUploadedFile(null);
    setShowFileUpload(false);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-neutral-900 dark:to-neutral-800">
      {/* Demo Prompts - Always visible */}
      <div className="p-4 border-b bg-white/70 dark:bg-black/70 backdrop-blur-sm">
        <div className="mb-2">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Quick Start Templates
          </h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {demoPrompts.map((demo, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-xs max-w-48 truncate"
              onClick={() => setInputPrompt(demo.prompt)}
              title={demo.prompt}
            >
              {demo.category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Start Creating Thumbnails
            </h3>
            <p className="text-muted-foreground mb-4">
              Use the templates above, describe your thumbnail, or upload an
              image to get started
            </p>
          </div>
        )}

        {conversation.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user"
                ? "justify-end"
                : message.type === "error"
                ? "justify-center"
                : "justify-start"
            }`}
          >
            {message.type === "error" ? (
              <div className="max-w-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {message.message}
                </p>
              </div>
            ) : (
              <div
                className={`max-w-3xl ${
                  message.type === "user"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                    : "bg-white dark:bg-gray-800 border"
                } rounded-2xl p-4 shadow-sm`}
              >
                {message.type === "user" ? (
                  <div>
                    {message.uploadedFile && (
                      <div className="mb-3">
                        <img
                          src={message.uploadedFile.url}
                          alt="Uploaded"
                          className="max-w-48 rounded-lg opacity-90"
                        />
                        <p className="text-xs text-white/70 mt-1">
                          {message.uploadedFile.name}
                        </p>
                      </div>
                    )}
                    <p className="text-sm">{message.prompt}</p>
                    {message.wasEnhanced && (
                      <span className="mt-2 bg-white/20 text-white border-white/30 text-xs px-2 py-1 rounded border inline-flex items-center">
                        <Sparkles className="w-3 h-3 mr-1" /> Enhanced
                      </span>
                    )}
                  </div>
                ) : (
                  <div>
                    {message.uploadedFile && (
                      <div className="mb-3">
                        <img
                          src={message.uploadedFile.url}
                          alt="Original"
                          className="max-w-48 rounded-lg"
                        />
                      </div>
                    )}
                    <div className="mb-3">
                      <p className="text-sm text-muted-foreground mb-2">
                        Generated from: "
                        {message.originalPrompt || message.prompt}"
                        {message.wasEnhanced && (
                          <span className="ml-2 text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded border">
                            <Sparkles className="w-3 h-3 mr-1 inline" />{" "}
                            Enhanced
                          </span>
                        )}
                      </p>
                      {message.generatedImage && (
                        <img
                          src={message.generatedImage}
                          alt="Generated thumbnail"
                          className="w-full rounded-lg shadow-sm"
                        />
                      )}
                      {message.textResponse && (
                        <p className="text-xs text-muted-foreground mt-2">
                          {message.textResponse}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(message)}
                          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded flex items-center gap-1"
                        >
                          <Edit3 className="w-4 h-4" /> Edit
                        </button>
                        <button
                          onClick={() => toggleLike(message.id)}
                          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded flex items-center gap-1"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              message.liked ? "fill-red-500 text-red-500" : ""
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = message.generatedImage;
                            link.download = `thumbnail-${message.id}.png`;
                            link.click();
                          }}
                          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded flex items-center gap-1"
                        >
                          <Download className="w-4 h-4" /> Download
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {isGenerating && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 border rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
                <p className="text-sm text-muted-foreground">
                  Generating your thumbnail...
                </p>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white/70 dark:bg-black/70 backdrop-blur-sm">
        {uploadedFile && (
          <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={uploadedFile.url}
                  alt="Preview"
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{uploadedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Ready to enhance
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-2 items-stretch">
          {/* Textarea + Add button */}
          <div className="flex-1 relative">
            <textarea
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Describe your thumbnail idea..."
              className="w-full h-full min-h-12 max-h-32 resize-none pr-12 p-2 border rounded-md bg-background"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 items-stretch">
            <button
              onClick={() => setShowEnhanceModal(true)}
              disabled={(!inputPrompt.trim() && !uploadedFile) || isGenerating}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded-md flex items-center gap-1 min-w-20"
            >
              <Sparkles className="w-4 h-4" />
              Enhance
            </button>
            <button
              onClick={() => handleGenerate(false)}
              disabled={(!inputPrompt.trim() && !uploadedFile) || isGenerating}
              className="border bg-background hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 px-4 py-2 rounded-md flex items-center gap-1 min-w-20"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send
                </>
              )}
            </button>
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          ref={fileInputRef}
        />
      </div>

      {/* Modals */}
      <EnhanceModal
        isOpen={showEnhanceModal}
        onClose={() => setShowEnhanceModal(false)}
        onSubmit={handleEnhanceSubmit}
        isLoading={isEnhancing}
      />

      <EditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingMessage(null);
        }}
        message={editingMessage}
        onSave={handleEditSave}
        isLoading={isGenerating}
      />
    </div>
  );
}
