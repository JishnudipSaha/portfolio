import { NextRequest, NextResponse } from "next/server"
import { processRAGQuery } from "@/lib/rag/engine"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, apiKey: bodyApiKey } = body
    const headerApiKey = req.headers.get("x-llm-key") || req.headers.get("x-gemini-key")
    const activeKey = (typeof bodyApiKey === "string" && bodyApiKey.trim()) || headerApiKey || undefined

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      )
    }

    if (message.length > 800) {
      return NextResponse.json(
        { error: "Query exceeds maximum length of 800 characters." },
        { status: 400 }
      )
    }

    const result = await processRAGQuery(message.trim(), activeKey)

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    })
  } catch (error) {
    console.error("RAG API Route Error:", error)
    return NextResponse.json(
      {
        error: "An error occurred while processing the RAG query.",
        answer: "I encountered an internal error while querying the knowledge base. Please feel free to email Jishnudip directly at jishnudip.saha.2004@gmail.com.",
        sources: [],
      },
      { status: 500 }
    )
  }
}
