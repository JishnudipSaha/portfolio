import { KnowledgeChunk, portfolioKnowledgeBase } from "./knowledge"

export interface RAGRetrievalResult {
  chunk: KnowledgeChunk
  score: number
  matchedTerms: string[]
}

export interface RAGResponse {
  answer: string
  sources: KnowledgeChunk[]
  query: string
  modelUsed: "gemini-api" | "local-rag-synthesizer"
}

// Common stop words to ignore in query tokenization
const stopWords = new Set([
  "a", "an", "the", "and", "or", "is", "are", "was", "were", "in", "on", "at", 
  "to", "for", "of", "with", "by", "from", "about", "what", "which", "who", 
  "whom", "whose", "where", "when", "how", "can", "could", "would", "should", 
  "do", "does", "did", "tell", "me", "show", "give", "i", "you", "he", "she", 
  "it", "we", "they", "his", "her", "their", "my", "your"
])

// Semantic synonym map for developer portfolio terminology
const synonymMap: Record<string, string[]> = {
  ml: ["machine learning", "deep learning", "model", "predictive", "neural"],
  ai: ["artificial intelligence", "deep learning", "langchain", "llm", "gemini"],
  python: ["scikit-learn", "pandas", "numpy", "opencv", "tensorflow"],
  next: ["nextjs", "react", "app router", "frontend"],
  frontend: ["react", "nextjs", "typescript", "tailwind", "ui"],
  backend: ["nodejs", "express", "flask", "java", "api"],
  hire: ["availability", "internship", "job", "work", "opportunities", "contact"],
  internship: ["codsoft", "experience", "work", "intern", "availability"],
  college: ["education", "nit", "narula", "btech", "degree", "university"],
  projects: ["portfolio", "repositories", "code", "built", "system"],
  resume: ["cv", "pdf", "download", "curriculum vitae"],
  contact: ["email", "reach", "message", "linkedin", "github"],
  java: ["hackerrank", "gold medal", "oop", "library management"],
  certifications: ["google", "google cloud", "deloitte", "credentials", "badges"],
}

/**
 * Tokenize text into lowercased clean words
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9#+.]+/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !stopWords.has(w))
}

/**
 * Expand query tokens with semantic synonyms
 */
function expandQuery(tokens: string[]): string[] {
  const expanded = new Set<string>(tokens)
  for (const token of tokens) {
    if (synonymMap[token]) {
      synonymMap[token].forEach((syn) => {
        syn.split(/\s+/).forEach((w) => expanded.add(w))
      })
    }
  }
  return Array.from(expanded)
}

/**
 * Calculate BM25 / TF-IDF style similarity score between query tokens and knowledge chunk
 */
function scoreChunk(chunk: KnowledgeChunk, queryTokens: string[], originalQuery: string): { score: number; matched: string[] } {
  let score = 0
  const matched: string[] = []

  const titleTokens = tokenize(chunk.title)
  const contentTokens = tokenize(chunk.content)
  const tagTokens = chunk.tags.map((t) => t.toLowerCase())
  const rawContentLower = chunk.content.toLowerCase()
  const rawTitleLower = chunk.title.toLowerCase()

  // Exact phrase match bonus
  if (rawTitleLower.includes(originalQuery.toLowerCase())) {
    score += 15
    matched.push("exact_title_match")
  } else if (rawContentLower.includes(originalQuery.toLowerCase())) {
    score += 8
    matched.push("exact_content_match")
  }

  for (const token of queryTokens) {
    let tokenMatched = false

    // 1. Tag Match (highest weight)
    if (tagTokens.some((tag) => tag.includes(token) || token.includes(tag))) {
      score += 6
      tokenMatched = true
    }

    // 2. Title Match (high weight)
    if (titleTokens.includes(token)) {
      score += 5
      tokenMatched = true
    }

    // 3. Content Match
    const countInContent = contentTokens.filter((t) => t === token).length
    if (countInContent > 0) {
      score += Math.min(countInContent * 1.5, 4.5)
      tokenMatched = true
    }

    if (tokenMatched) {
      matched.push(token)
    }
  }

  // Length normalization penalty so longer docs don't unfairly dominate
  const lenPenalty = Math.log(contentTokens.length + 10) / Math.log(80)
  const normalizedScore = score / lenPenalty

  return { score: normalizedScore, matched }
}

/**
 * Retrieve top relevant chunks from portfolio knowledge base
 */
export function retrieveContext(query: string, topK = 4): RAGRetrievalResult[] {
  const cleanTokens = tokenize(query)
  if (cleanTokens.length === 0) return []

  const expandedTokens = expandQuery(cleanTokens)

  const results: RAGRetrievalResult[] = portfolioKnowledgeBase.map((chunk) => {
    const { score, matched } = scoreChunk(chunk, expandedTokens, query)
    return { chunk, score, matchedTerms: matched }
  })

  return results
    .filter((r) => r.score > 0.8)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
}

/**
 * Local Context Synthesis Engine:
 * Generates an authentic, first-person response as Jishnudip Saha when no LLM API key is configured.
 */
function synthesizeLocalAnswer(query: string, retrieved: RAGRetrievalResult[]): string {
  if (retrieved.length === 0) {
    return `Hey! I don't have that specific topic documented in my portfolio records yet for "${query}". You can ask me about my **programming skills** (Python, TypeScript, Java, TensorFlow), my **machine learning projects** (like my Movie Recommender or Titanic Classifier), my **education** at Narula Institute of Technology, or how we can connect for **internships**!`
  }

  const queryLower = query.toLowerCase()
  const top = retrieved[0].chunk

  // Specialized synthesis based on query intent
  if (queryLower.includes("skill") || queryLower.includes("tech") || queryLower.includes("stack") || queryLower.includes("language")) {
    const skillChunks = retrieved.filter((r) => r.chunk.category === "skills")
    const chunks = skillChunks.length > 0 ? skillChunks.map((r) => r.chunk) : retrieved.map((r) => r.chunk)
    
    return `Hey! Here is a breakdown of what I build with every day:\n\n` +
      chunks.map((c) => `### ⚡ ${c.title}\n${c.content}`).join("\n\n") +
      `\n\n👉 You can interactively filter all 18+ technologies in my [Tech Stack Matrix](/about#skills) on the About page.`
  }

  if (queryLower.includes("project") || queryLower.includes("built") || queryLower.includes("work") || queryLower.includes("app")) {
    const projChunks = retrieved.filter((r) => r.chunk.category === "projects")
    const chunks = projChunks.length > 0 ? projChunks.map((r) => r.chunk) : retrieved.map((r) => r.chunk)

    return `I'd love to share my engineering projects with you! Here are some of the key builds I've architected:\n\n` +
      chunks.map((c) => `### 🚀 [${c.title}](${c.link || "/projects"})\n${c.content}`).join("\n\n") +
      `\n\n👉 You can explore all my repositories and test out live deployed demos in my [Projects Showcase](/projects).`
  }

  if (queryLower.includes("contact") || queryLower.includes("email") || queryLower.includes("hire") || queryLower.includes("reach") || queryLower.includes("message") || queryLower.includes("available")) {
    return `### 📬 Let's Connect!\n\n` +
      `I am **actively seeking software engineering & data science internships** and high-impact technical collaborations. I'd love to discuss opportunities with your team!\n\n` +
      `* **Email:** [jishnudip.saha.2004@gmail.com](mailto:jishnudip.saha.2004@gmail.com) *(I respond within 24 hours)*\n` +
      `* **GitHub:** [github.com/JishnudipSaha](https://github.com/JishnudipSaha)\n` +
      `* **LinkedIn:** [linkedin.com/in/jishnudipsaha](https://www.linkedin.com/in/jishnudipsaha/)\n` +
      `* **Location:** Kolkata, West Bengal, India (UTC+5:30)\n\n` +
      `👉 You can also dispatch a direct message to me right from my [Contact Terminal](/contact).`
  }

  if (queryLower.includes("education") || queryLower.includes("college") || queryLower.includes("university") || queryLower.includes("degree")) {
    return `### 🎓 My Academic Background\n\n` +
      `I'm currently in my B.Tech program in Computer Science & Engineering (specializing in Data Science) at **Narula Institute of Technology**, graduating in 2027.\n\n` +
      `My coursework emphasizes Machine Learning, Deep Learning, Statistical Analysis, Algorithms, and Distributed Systems.\n\n` +
      `👉 Learn more about my journey on my [About Page](/about).`
  }

  if (queryLower.includes("achievement") || queryLower.includes("certification") || queryLower.includes("cert") || queryLower.includes("medal") || queryLower.includes("award")) {
    const certChunks = retrieved.filter((r) => r.chunk.category === "achievements")
    const chunks = certChunks.length > 0 ? certChunks.map((r) => r.chunk) : retrieved.map((r) => r.chunk)

    return `### 🏆 Honors & Verified Credentials\n\n` +
      `Here are some recognitions I've earned:\n\n` +
      chunks.map((c) => `* **${c.title}**\n  ${c.content}`).join("\n\n") +
      `\n\n👉 You can verify my credential IDs directly on my [Achievements Page](/achievements).`
  }

  if (queryLower.includes("resume") || queryLower.includes("cv")) {
    return `### 📄 My Resume & CV\n\n` +
      `You can download a clean PDF copy of my latest resume right here:\n\n` +
      `📥 **[Download Jishnudip Saha CV (PDF)](/Jishnudip%20Saha%20CV.pdf)**\n\n` +
      `It includes comprehensive details on my data science projects, technical proficiencies, education, and credentials.`
  }

  // General synthesized answer from retrieved chunks
  const primaryChunk = retrieved[0].chunk
  const secondaryChunk = retrieved[1]?.chunk

  let answer = `Regarding **${primaryChunk.title}**, here is what I can share from my experience:\n\n${primaryChunk.content}`
  if (secondaryChunk && secondaryChunk.id !== primaryChunk.id) {
    answer += `\n\nAlso, on **${secondaryChunk.title}**:\n${secondaryChunk.content}`
  }

  if (primaryChunk.link) {
    answer += `\n\n👉 Feel free to explore: [${primaryChunk.title}](${primaryChunk.link})`
  }

  return answer
}

/**
 * Call Google Gemini API if key is present in environment
 */
async function callGeminiRAG(query: string, retrieved: RAGRetrievalResult[], apiKey: string): Promise<string> {
  const contextText = retrieved
    .map((r, i) => `[Document ${i + 1}: ${r.chunk.title}]\n${r.chunk.content}\nLink: ${r.chunk.link || "N/A"}`)
    .join("\n\n")

  const systemInstruction = 
    `You ARE Jishnudip Saha himself, chatting directly with visitors, tech recruiters, and engineering leaders who are browsing your personal portfolio website.\n\n` +
    `CRITICAL PERSONA RULES:\n` +
    `1. ALWAYS speak in the first person ("I", "my", "me"). NEVER speak as a third party or refer to "Jishnudip" as someone else.\n` +
    `2. Persona: You are an ambitious, intelligent, warm, and humble 3rd-year Data Science undergraduate at Narula Institute of Technology (graduating in 2027) with strong hands-on expertise in Python, TensorFlow, Scikit-learn, TypeScript, Next.js, and Java.\n` +
    `3. Conversational style: Friendly, articulate, energetic, and developer-savvy. Use natural conversational openings ("Hey there!", "Thanks for asking!", "That's one of my favorite projects!").\n` +
    `4. Grounding: Answer strictly using facts from the provided portfolio context. Highlight your real metrics, datasets used (TMDB, OCT retinal scans, etc.), and technologies.\n` +
    `5. Internships & Hiring: Always emphasize that you are actively seeking and excited for software engineering and data science internships!\n` +
    `6. If something is unknown or not in context: Say warmly "I haven't posted that on my portfolio yet, but drop me an email at jishnudip.saha.2004@gmail.com and let's talk about it!"\n` +
    `7. Format: Use clean GitHub markdown, bold highlights, concise bullet points, and markdown links to pages.`

  const prompt = `Retrieved Portfolio Context:\n${contextText}\n\nVisitor's Message:\n${query}\n\nReply as Jishnudip:`

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] },
      generationConfig: {
        temperature: 0.35,
        maxOutputTokens: 600,
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!candidate) {
    throw new Error("No text response returned by Gemini API")
  }

  return candidate
}

/**
 * Main RAG Query Processor
 */
export async function processRAGQuery(query: string): Promise<RAGResponse> {
  const retrieved = retrieveContext(query, 4)
  const apiKey = process.env.GEMINI_API_KEY

  if (apiKey && apiKey.trim().length > 10) {
    try {
      const llmAnswer = await callGeminiRAG(query, retrieved, apiKey)
      return {
        answer: llmAnswer,
        sources: retrieved.map((r) => r.chunk),
        query,
        modelUsed: "gemini-api",
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to local RAG synthesizer:", err)
    }
  }

  // Local RAG Synthesizer fallback
  const localAnswer = synthesizeLocalAnswer(query, retrieved)
  return {
    answer: localAnswer,
    sources: retrieved.map((r) => r.chunk),
    query,
    modelUsed: "local-rag-synthesizer",
  }
}
