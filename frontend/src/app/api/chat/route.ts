import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

export async function POST(request: NextRequest) {
    try {
        if (!GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY is not configured");
            return NextResponse.json(
                { error: "API key not configured" },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { messages, systemContext } = body as {
            messages: ChatMessage[];
            systemContext: string;
        };

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Invalid messages format" },
                { status: 400 }
            );
        }

        // Build the conversation history for Gemini
        const contents = [];

        // Add system context as the first user message with model acknowledgment
        contents.push({
            role: "user",
            parts: [{ text: `System Instructions: ${systemContext}\n\nPlease acknowledge and follow these instructions for all subsequent messages.` }]
        });
        contents.push({
            role: "model",
            parts: [{ text: "I understand. I am Nexus, the AI assistant for Somahorse Nexus. I will follow these instructions and help users learn about the platform, guide talent through the signup process, and assist clients with AI solution requests. How can I help you today?" }]
        });

        // Add conversation history
        for (const msg of messages) {
            contents.push({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.content }]
            });
        }

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents,
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Gemini API error:", errorData);
            return NextResponse.json(
                { error: "Failed to get response from AI" },
                { status: 500 }
            );
        }

        const data = await response.json();
        
        // Extract the response text
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
            "I apologize, but I couldn't generate a response. Please try again.";

        return NextResponse.json({ response: responseText });

    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
