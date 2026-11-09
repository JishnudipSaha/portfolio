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
  modelUsed: "gemini-2.0-flash" | "gemini-1.5-flash" | "groq-llama-3.3" | "openai-gpt-4o" | "local-rag-synthesizer"
}

// Common stop words to ignore in query tokenization
const stopWords = new Set([
  "a", "an", "the", "and", "or", "is", "are", "was", "were", "in", "on", "at", 
  "to", "for", "of", "with", "by", "from", "about", "what", "which", "who", 
  "whom", "whose", "where", "when", "how", "can", "could", "would", "should", 
  "do", "does", "did", "tell", "me", "show", "give", "i", "you", "he", "she", 
  "it", "we", "they", "his", "her", "their", "my", "your"
])

// Semantic synonym map for updated developer portfolio & resume terminology
const synonymMap: Record<string, string[]> = {
  ml: ["machine learning", "deep learning", "model", "predictive", "neural", "oct", "retina"],
  ai: ["artificial intelligence", "deep learning", "retinaface", "arcface", "insightface", "opencv"],
  python: ["scikit-learn", "pandas", "numpy", "fastapi", "dvc"],
  fastapi: ["api", "backend", "postgresql", "rest", "modular"],
  docker: ["containers", "containerization", "deployment", "tools", "platform"],
  dvc: ["data version control", "pipeline", "versioning", "reproducibility", "titanic"],
  hire: ["availability", "internship", "job", "work", "opportunities", "contact"],
  internship: ["experience", "work", "intern", "ediglobe", "shadowfox", "google aicte"],
  college: ["education", "nit", "narula", "btech", "degree", "academics", "cgpa", "8.08"],
  school: ["sudhir memorial", "st xaviers", "secondary", "higher secondary", "10th", "12th", "marks", "percentage"],
  cgpa: ["grade", "marks", "score", "8.08", "academics", "percentage", "sem", "semester"],
  attendance: ["smart attendance", "face recognition", "retinaface", "arcface", "insightface", "opencv", "docker"],
  projects: ["portfolio", "repositories", "code", "built", "eye disease", "titanic", "smart attendance"],
  resume: ["cv", "pdf", "download", "curriculum vitae", "profile"],
  contact: ["email", "reach", "message", "linkedin", "github", "belgharia", "kolkata"],
  java: ["nptel", "92/100", "oop", "programming"],
  certifications: ["nptel", "google", "eduskills", "aicte", "ediglobe", "shadowfox", "credentials"],
}

// In-scope portfolio keywords to verify whether a query is related to Jishnu's CV / academics / projects
const inScopeVocabulary = new Set([
  "jishnu", "jishnudip", "saha", "you", "your", "yourself", "who", "whom",
  "resume", "cv", "profile", "bio", "background", "about",
  "education", "academics", "college", "school", "university", "degree", "btech", "cse", "narula", "nit",
  "cgpa", "marks", "grade", "percentage", "score", "10th", "12th", "semester", "secondary", "sudhir", "xavier",
  "skill", "skills", "tech", "stack", "language", "languages", "python", "java", "c", "c++", "cpp", "sql", "mysql", "postgresql",
  "fastapi", "docker", "dvc", "git", "github", "scikit", "pandas", "numpy", "opencv", "retinaface", "arcface", "insightface",
  "project", "projects", "eye disease", "oct", "retina", "titanic", "attendance", "spam", "ham",
  "internship", "intern", "experience", "ediglobe", "shadowfox", "aicte", "eduskills", "nptel", "certificate", "certificates", "certification",
  "contact", "email", "hire", "work", "job", "available", "opportunity", "reach", "linkedin", "location", "kolkata", "belgharia",
  "hi", "hello", "hey", "greetings", "morning", "afternoon", "evening", "thanks", "thank you", "bye"
])

/**
 * Check if a query is strictly in-scope for Jishnudip's CV, resume, academics, or portfolio.
 */
function isOutOfScope(query: string, retrieved: RAGRetrievalResult[]): boolean {
  const cleanTokens = tokenize(query)
  if (cleanTokens.length === 0) return false // Empty or pure greetings handled elsewhere

  // Check if any clean token matches the portfolio vocabulary
  const hasInScopeToken = cleanTokens.some((t) => inScopeVocabulary.has(t))
  if (hasInScopeToken) return false

  // Check if expanded tokens match any in-scope vocabulary
  const expanded = expandQuery(cleanTokens)
  const hasExpandedMatch = expanded.some((t) => inScopeVocabulary.has(t))
  if (hasExpandedMatch) return false

  // If top retrieved score is very high (above 6), it's probably relevant
  if (retrieved.length > 0 && retrieved[0].score >= 6) return false

  // Otherwise, it is out-of-scope!
  return true
}

const OUT_OF_SCOPE_REFUSAL = 
  `Hey! As Jishnudip's AI portfolio assistant, I am **exclusively trained to answer questions about my CV, resume, academic records, data science projects, technical skills, and internship availability**.\n\n` +
  `I do not answer general trivia, homework questions, or unrelated off-topic queries. Feel free to ask me anything about:\n` +
  `* **🎓 Academics:** Narula Institute of Technology (CGPA: 8.08), 12th (89.02%), or 10th (90.25%)\n` +
  `* **⚡ Technical Skills:** Python, Java, C/C++, FastAPI, Scikit-learn, SQL/PostgreSQL, Docker, DVC\n` +
  `* **🚀 Projects:** Eye Disease Detection (OCT), Titanic Survival (DVC), or Smart Attendance (FastAPI/RetinaFace)\n` +
  `* **💼 Experience:** EdiGlobe, ShadowFox, and Google AI-ML Virtual Internship (AICTE)\n` +
  `* **📄 Resume & Contact:** Downloading my CV or getting in touch for internships!`

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
 * Generates an authentic, first-person response as Jishnudip Saha based strictly on CV records.
 */
function synthesizeLocalAnswer(query: string, retrieved: RAGRetrievalResult[]): string {
  // Check strict out-of-scope guardrail
  if (isOutOfScope(query, retrieved)) {
    return OUT_OF_SCOPE_REFUSAL
  }

  if (retrieved.length === 0) {
    return OUT_OF_SCOPE_REFUSAL
  }

  const queryLower = query.toLowerCase()

  // 1. Self-Introduction / Bio
  if (
    queryLower.includes("about yourself") ||
    queryLower.includes("about you") ||
    queryLower.includes("who are you") ||
    queryLower.includes("introduce yourself") ||
    queryLower.includes("introduction") ||
    queryLower.includes("who is jishnu") ||
    queryLower.includes("tell me about yourself") ||
    queryLower.includes("summary") ||
    queryLower.includes("who jishnu")
  ) {
    return `Hey! 👋 I'm **Jishnudip Saha**, a passionate Data Science student at **Narula Institute of Technology** (Kolkata, class of 2027) with a **CGPA of 8.08 (upto 5th sem)**.\n\n` +
      `I have a strong foundation in Python, machine learning, and data analysis, with experience building end-to-end projects from data preprocessing to model evaluation. Here is a quick snapshot of my background:\n\n` +
      `* **🎓 Academics:** B.Tech in CSE (Narula Institute of Technology, CGPA: 8.08) • 12th from Sudhir Memorial (89.02%) • 10th from St. Xavier's (90.25%).\n` +
      `* **⚡ Core Skills:** Python, Java (NPTEL 92/100), C/C++, SQL, MySQL, PostgreSQL, FastAPI, Scikit-learn, Pandas, NumPy, Docker, and DVC.\n` +
      `* **🚀 Key Projects:** Eye Disease Detection (OCT Deep Learning), Titanic Disaster Prediction with DVC, and AI-Powered Smart Attendance System (FastAPI/RetinaFace/Docker).\n` +
      `* **💼 Experience:** Data Science Intern at **EdiGlobe** (Titanic 97% accuracy, Spam-Ham) & **ShadowFox** (EDA, Scikit-learn, ROC-AUC).\n` +
      `* **🏆 Credentials:** Google AI-ML Virtual Internship (EduSkills/AICTE, 100% marks), NPTEL Java (92/100).\n\n` +
      `👉 Feel free to ask about any specific project, download my [Resume](/Jishnudip%20Saha%20CV.pdf), or email me directly at [jishnudip.saha.2004@gmail.com](mailto:jishnudip.saha.2004@gmail.com)!`
  }

  // 2. Education & Academics (CGPA, marks, schools)
  if (
    queryLower.includes("education") ||
    queryLower.includes("academic") ||
    queryLower.includes("college") ||
    queryLower.includes("university") ||
    queryLower.includes("degree") ||
    queryLower.includes("btech") ||
    queryLower.includes("cgpa") ||
    queryLower.includes("marks") ||
    queryLower.includes("percentage") ||
    queryLower.includes("school") ||
    queryLower.includes("10th") ||
    queryLower.includes("12th") ||
    queryLower.includes("sudhir") ||
    queryLower.includes("xavier") ||
    queryLower.includes("nit") ||
    queryLower.includes("narula")
  ) {
    return `### 🎓 My Academic Background\n\n` +
      `Here is my complete verified academic track record from my resume:\n\n` +
      `1. **Bachelor of Technology (B.Tech) in Computer Science and Engineering**\n` +
      `   * **Institution:** Narula Institute of Technology, Kolkata (08/2023 – Present)\n` +
      `   * **Score:** **CGPA: 8.08** (upto 5th semester)\n\n` +
      `2. **Higher Secondary (Class 12)**\n` +
      `   * **Institution:** Sudhir Memorial Institute, Kolkata (04/2022 – 04/2023)\n` +
      `   * **Score:** **89.02%**\n\n` +
      `3. **Secondary Education (Class 10)**\n` +
      `   * **Institution:** St. Xavier's Institute (04/2020 – 04/2021)\n` +
      `   * **Score:** **90.25%**`
  }

  // 3. Technical Skills
  if (queryLower.includes("skill") || queryLower.includes("tech") || queryLower.includes("stack") || queryLower.includes("language") || queryLower.includes("database") || queryLower.includes("framework") || queryLower.includes("tool")) {
    return `### ⚡ Technical Skills & Proficiencies\n\n` +
      `Straight from my updated resume, here are the technologies I actively build with:\n\n` +
      `* **Programming Languages:** Java, Python, C/C++\n` +
      `* **Database Management:** SQL, MySQL, PostgreSQL\n` +
      `* **Frameworks & Libraries:** FastAPI, Scikit-learn, Pandas, NumPy, OpenCV, RetinaFace, ArcFace\n` +
      `* **Tools & Platforms:** Git, GitHub, Docker, DVC (Data Version Control)`
  }

  // 4. Projects
  if (queryLower.includes("project") || queryLower.includes("built") || queryLower.includes("eye disease") || queryLower.includes("oct") || queryLower.includes("titanic") || queryLower.includes("attendance") || queryLower.includes("dvc")) {
    return `### 🚀 Key Projects from My Resume\n\n` +
      `1. **Eye Disease Detection using Deep Learning (OCT Images)**\n` +
      `   * Developed a Deep Learning model to detect eye diseases using Optical Coherence Tomography (OCT) retinal images.\n\n` +
      `2. **Titanic Disaster Prediction Model using DVC**\n` +
      `   * Developed an ML model to predict passenger survival on the Titanic dataset.\n` +
      `   * Implemented a data versioning pipeline using **DVC** to track datasets, model versions, and experiments.\n` +
      `   * Built a structured, reproducible ML workflow with Python and Scikit-learn.\n\n` +
      `3. **AI-Powered Smart Attendance System**\n` +
      `   * **Tech Stack:** FastAPI, PostgreSQL, RetinaFace, InsightFace, OpenCV, Docker.\n` +
      `   * Multi-face classroom recognition with automated attendance logging.\n` +
      `   * Modular FastAPI backend with facial embedding generation and PostgreSQL integration using ArcFace cosine similarity and confidence thresholding.`
  }

  // 5. Experience & Internships
  if (queryLower.includes("experience") || queryLower.includes("internship") || queryLower.includes("ediglobe") || queryLower.includes("shadowfox")) {
    return `### 💼 Work Experience & Internships\n\n` +
      `1. **EdiGlobe — Data Science Intern (09/2025 – 10/2025 | Kolkata)**\n` +
      `   * Worked on Titanic survival prediction, achieving **97% accuracy** through data preprocessing and model evaluation.\n` +
      `   * Built and trained a Spam-Ham prediction model for text classification.\n\n` +
      `2. **ShadowFox — Data Science Intern (08/2025 – 10/2025 | Kolkata)**\n` +
      `   * Performed data preprocessing, feature engineering, and model training using Python and Scikit-learn for predictive analysis.\n` +
      `   * Conducted Exploratory Data Analysis (EDA) to extract insights from real-world datasets.\n` +
      `   * Optimized model performance evaluated with accuracy and ROC-AUC metrics.`
  }

  // 6. Certificates
  if (queryLower.includes("certificate") || queryLower.includes("certification") || queryLower.includes("nptel") || queryLower.includes("aicte") || queryLower.includes("eduskills")) {
    return `### 🏆 Certificates & Verified Credentials\n\n` +
      `* **Programming in Java (NPTEL):** Scored **92/100**.\n` +
      `* **Google AI-ML Virtual Internship:** Conducted by EduSkills in collaboration with AICTE. Secured **100% marks**.\n` +
      `* **Data Science Internship Program Certifications:** Officially awarded by **EdiGlobe** and **ShadowFox**.`
  }

  // 7. Resume Download
  if (queryLower.includes("resume") || queryLower.includes("cv")) {
    return `### 📄 Resume & CV Download\n\n` +
      `You can download a clean PDF copy of my updated resume here:\n\n` +
      `📥 **[Download Jishnudip Saha CV (PDF)](/Jishnudip%20Saha%20CV.pdf)**\n\n` +
      `It includes my full academic details (NIT CGPA: 8.08, 12th: 89.02%, 10th: 90.25%), projects (DVC Titanic, Smart Attendance, OCT Eye Disease), skills, and internships.`
  }

  // 8. Contact & Availability
  if (queryLower.includes("contact") || queryLower.includes("email") || queryLower.includes("hire") || queryLower.includes("reach") || queryLower.includes("available") || queryLower.includes("location") || queryLower.includes("linkedin") || queryLower.includes("github")) {
    return `### 📬 Contact & Availability\n\n` +
      `I am **actively seeking Software Engineering and Data Science internships** and technical collaborations!\n\n` +
      `* **Email:** [jishnudip.saha.2004@gmail.com](mailto:jishnudip.saha.2004@gmail.com)\n` +
      `* **LinkedIn:** [linkedin.com/in/jishnudipsaha](https://www.linkedin.com/in/jishnudipsaha/)\n` +
      `* **GitHub:** [github.com/JishnudipSaha](https://github.com/JishnudipSaha)\n` +
      `* **Location:** Kolkata (1/41/1, Jatindas Nagar, Belgharia, Kolkata)`
  }

  // General synthesized answer from retrieved chunks
  const primaryChunk = retrieved[0].chunk
  const secondaryChunk = retrieved[1]?.chunk

  let answer = `Regarding **${primaryChunk.title}** from my resume:\n\n${primaryChunk.content}`
  if (secondaryChunk && secondaryChunk.id !== primaryChunk.id) {
    answer += `\n\nAlso, regarding **${secondaryChunk.title}**:\n${secondaryChunk.content}`
  }

  if (primaryChunk.link) {
    answer += `\n\n👉 Feel free to explore: [${primaryChunk.title}](${primaryChunk.link})`
  }

  return answer
}

/**
 * Call LLM APIs (Groq Llama, Google Gemini, or OpenAI)
 */
async function callLLMRAG(
  query: string,
  retrieved: RAGRetrievalResult[],
  apiKey: string
): Promise<{ answer: string; modelUsed: RAGResponse["modelUsed"] }> {
  const contextText = retrieved
    .map((r, i) => `[Resume Section ${i + 1}: ${r.chunk.title}]\n${r.chunk.content}\nLink: ${r.chunk.link || "N/A"}`)
    .join("\n\n")

  const systemInstruction = 
    `You ARE Jishnudip Saha himself, chatting directly with visitors, tech recruiters, and engineering leaders who are browsing your personal portfolio website.\n\n` +
    `CRITICAL SCOPE RESTRICTION & STRICT BOUNDARY POLICY:\n` +
    `1. ONLY ANSWER QUESTIONS ABOUT YOUR CV, RESUME, ACADEMICS, PROJECTS, AND INTERNSHIPS:\n` +
    `   You are STRICTLY CONSTRAINED to answering queries directly related to Jishnudip Saha's:\n` +
    `   - Academics: Narula Institute of Technology (B.Tech in CSE 08/2023–Present, CGPA: 8.08 upto 5th sem); Sudhir Memorial Institute (Higher Secondary 04/2022–04/2023, 89.02%); St. Xavier's Institute (Secondary 04/2020–04/2021, 90.25%).\n` +
    `   - Technical Skills: Java, Python, C/C++, SQL, MySQL, PostgreSQL, FastAPI, Scikit-learn, Pandas, NumPy, OpenCV, Git, GitHub, Docker, DVC (Data Version Control).\n` +
    `   - Projects: Eye Disease Detection using Deep Learning (OCT Images); Titanic Disaster Prediction model using DVC; AI-Powered Smart Attendance System (FastAPI, PostgreSQL, RetinaFace, InsightFace, OpenCV, Docker, ArcFace cosine similarity).\n` +
    `   - Internships: EdiGlobe (09/2025–10/2025, Titanic survival 97% accuracy, Spam-Ham); ShadowFox (08/2025–10/2025, data preprocessing, feature engineering, Scikit-learn models, EDA, ROC-AUC); Google AI-ML Virtual Internship with EduSkills/AICTE (100% marks).\n` +
    `   - Certificates: Programming in Java NPTEL (Scored 92/100); EduSkills/AICTE (100%); EdiGlobe & ShadowFox internship certificates.\n` +
    `   - Contact & Availability: Actively seeking Software Engineering & Data Science internships. Email: jishnudip.saha.2004@gmail.com, LinkedIn, GitHub, Belgharia/Kolkata.\n\n` +
    `2. STRICT REFUSAL FOR OUT-OF-SCOPE / OFF-TOPIC QUERIES:\n` +
    `   If the visitor asks ANY question NOT related to Jishnudip Saha's CV, resume, academics, skills, projects, or career opportunities (such as general knowledge, trivia, history, weather, politics, recipes, sports, creative writing, homework/math assistance, general programming questions unrelated to your projects):\n` +
    `   You MUST POLITELY REFUSE by saying:\n` +
    `   "Hey! As Jishnudip's AI portfolio twin, I am exclusively dedicated to answering questions about my CV, resume, academic background, data science projects, technical skills, and internship availability. I cannot answer general trivia or off-topic queries, but please feel free to ask me anything about my machine learning projects, college, or tech stack!"\n\n` +
    `3. PERSONA & FORMAT:\n` +
    `   - ALWAYS speak in the first person ("I", "my", "me"). NEVER speak in third person.\n` +
    `   - Maintain a friendly, sharp, humble, articulate tone as an ambitious 3rd-year CS Data Science student.\n` +
    `   - Ground your answers strictly in the provided resume context. Do not invent any unmentioned degrees or companies.\n` +
    `   - Format your answers cleanly with GitHub markdown (bullet points, bold text).`

  const prompt = `Verified Resume Context:\n${contextText}\n\nVisitor's Message:\n${query}\n\nReply as Jishnudip:`

  const cleanKey = apiKey.trim()

  // Groq API (Keys start with gsk_)
  if (cleanKey.startsWith("gsk_")) {
    const groqModels = ["openai/gpt-oss-120b", "qwen/qwen3.8-27b", "openai/gpt-oss-20b", "llama-3.3-70b-versatile"]

    for (const model of groqModels) {
      try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: systemInstruction },
              { role: "user", content: prompt },
            ],
            temperature: 0.25, // Lower temperature for strict factual grounding
            max_tokens: 650,
          }),
        })

        if (res.ok) {
          const data = await res.json()
          const content = data.choices?.[0]?.message?.content
          if (content) {
            return { answer: content, modelUsed: "groq-llama-3.3" }
          }
        }
      } catch {
        // Fallback to next model
      }
    }

    throw new Error("All Groq models failed")
  }

  // OpenAI API (Keys start with sk-)
  if (cleanKey.startsWith("sk-")) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cleanKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: prompt },
        ],
        temperature: 0.25,
        max_tokens: 650,
      }),
    })

    if (!res.ok) {
      throw new Error(`OpenAI API error: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    const content = data.choices?.[0]?.message?.content
    if (!content) throw new Error("No answer from OpenAI API")
    return { answer: content, modelUsed: "openai-gpt-4o" }
  }

  // Default: Google Gemini API (Try 2.0 Flash first, fallback to 1.5 Flash)
  const modelsToTry = ["gemini-2.0-flash", "gemini-1.5-flash"]

  for (const modelName of modelsToTry) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${cleanKey}`
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: {
            temperature: 0.25,
            maxOutputTokens: 650,
          },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text
        if (candidate) {
          return {
            answer: candidate,
            modelUsed: modelName === "gemini-2.0-flash" ? "gemini-2.0-flash" : "gemini-1.5-flash",
          }
        }
      }
    } catch {
      // Try next model fallback
    }
  }

  throw new Error("Gemini API calls failed for all candidate models")
}

/**
 * Main RAG Query Processor
 */
export async function processRAGQuery(query: string, customApiKey?: string): Promise<RAGResponse> {
  const retrieved = retrieveContext(query, 4)
  const apiKey =
    customApiKey ||
    process.env.GEMINI_API_KEY ||
    process.env.GROQ_API_KEY ||
    process.env.OPENAI_API_KEY

  if (apiKey && apiKey.trim().length > 10) {
    try {
      const llmResult = await callLLMRAG(query, retrieved, apiKey)
      return {
        answer: llmResult.answer,
        sources: retrieved.map((r) => r.chunk),
        query,
        modelUsed: llmResult.modelUsed,
      }
    } catch (err) {
      console.warn("LLM API call failed, falling back to local RAG synthesizer:", err)
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
