export interface KnowledgeChunk {
  id: string
  title: string
  category: "bio" | "education" | "skills" | "projects" | "achievements" | "contact" | "faq"
  content: string
  tags: string[]
  link?: string
}

export const portfolioKnowledgeBase: KnowledgeChunk[] = [
  // --- Bio & Profile ---
  {
    id: "bio-summary",
    title: "About Jishnudip Saha",
    category: "bio",
    content: "Jishnudip Saha is a passionate Data Science student and Full-Stack Software Developer based in Kolkata, India. He focuses on building intelligent neural systems that bridge the gap between machine learning models and high-performance, real-world software applications.",
    tags: ["bio", "about", "whoami", "jishnudip", "summary", "profile", "developer", "engineer"],
    link: "/about",
  },
  {
    id: "bio-mission",
    title: "Mission and Engineering Philosophy",
    category: "bio",
    content: "Jishnudip's engineering philosophy is centered around transforming raw, complex data into practical, scalable production software. He specializes in predictive analytics, deep learning pipelines, and responsive modern web architectures using TypeScript, Python, and Next.js.",
    tags: ["mission", "philosophy", "goals", "focus", "interests", "specialty"],
    link: "/about",
  },

  // --- Education ---
  {
    id: "edu-nit",
    title: "Undergraduate Education",
    category: "education",
    content: "Jishnudip is pursuing his Bachelor of Technology (B.Tech) in Computer Science and Engineering with a specialization in Data Science at Narula Institute of Technology (2023 - 2027), located in Kolkata, West Bengal. His coursework covers Algorithms, Data Structures, Machine Learning, Deep Learning, DBMS, Distributed Systems, and Object-Oriented Programming.",
    tags: ["education", "college", "university", "btech", "degree", "narula", "nit", "graduation", "2027", "academics"],
    link: "/about",
  },

  // --- Skills ---
  {
    id: "skills-languages",
    title: "Programming Languages",
    category: "skills",
    content: "Core languages: Python (92% proficiency, 3+ years experience, used for ML/data science/backend), TypeScript (85% proficiency, typed frontend and Next.js applications), JavaScript (90%, full-stack web standard), Java (88%, OOP, algorithms, HackerRank Gold Medal), C++ (75%, data structures and systems programming), and SQL (82%, relational queries, PostgreSQL, MySQL).",
    tags: ["skills", "languages", "python", "typescript", "javascript", "java", "cpp", "c++", "sql"],
    link: "/about",
  },
  {
    id: "skills-ai-ml",
    title: "AI, Machine Learning & Data Science Stack",
    category: "skills",
    content: "AI/ML stack: TensorFlow & Keras (deep learning and CNN architectures), Scikit-Learn (classification, regression, clustering, ensemble models), Pandas & NumPy (data wrangling and vector math), OpenCV (computer vision and facial recognition), LangChain (LLM applications, RAG pipelines, and prompt chaining), and Matplotlib & Seaborn (statistical data visualization).",
    tags: ["skills", "ai", "ml", "machine learning", "deep learning", "tensorflow", "scikit-learn", "pandas", "numpy", "opencv", "langchain", "data science"],
    link: "/about",
  },
  {
    id: "skills-web-devops",
    title: "Web Development & Tools",
    category: "skills",
    content: "Web and tooling stack: Next.js 16 (App Router, Turbopack, SSR/SSG), React 19 (functional components, hooks, modern UI), Tailwind CSS (responsive design, glassmorphism, micro-animations), Node.js & Express (RESTful APIs), Streamlit (rapid ML dashboard deployment), MongoDB, Git & GitHub (version control and CI workflows), Linux/Bash CLI, and Figma (interface design).",
    tags: ["skills", "web", "nextjs", "react", "tailwind", "nodejs", "git", "linux", "mongodb", "streamlit"],
    link: "/about",
  },

  // --- Featured Projects ---
  {
    id: "proj-movie-rec",
    title: "Movie Recommendation System",
    category: "projects",
    content: "Machine learning content-based movie recommendation engine utilizing cosine similarity, TF-IDF vectorization, and NLTK on the TMDB (The Movie Database) dataset. Users enter a movie title and the system calculates similarity vectors across genre, director, cast, and overview keywords to recommend the top 5 matching films. Deployed with an interactive Streamlit UI.",
    tags: ["projects", "movie", "recommendation", "nlp", "streamlit", "cosine similarity", "tmdb", "python"],
    link: "https://jishnudip-mrs-project-tmdb.streamlit.app/",
  },
  {
    id: "proj-titanic",
    title: "Titanic Survival Predictor",
    category: "projects",
    content: "End-to-end classification system predicting passenger survival on the Titanic based on demographic and voyage features (age, sex, passenger class, fare, family size). Built with Scikit-Learn, RandomForestClassifier, and Pandas with exploratory data analysis and feature importance visualization. Deployed live on Streamlit.",
    tags: ["projects", "titanic", "survival", "classification", "machine learning", "random forest", "streamlit"],
    link: "https://codsoft-project-titanic.streamlit.app/",
  },
  {
    id: "proj-sms-spam",
    title: "SMS Spam Detection & Filter",
    category: "projects",
    content: "Natural Language Processing (NLP) text classification system that filters incoming SMS messages into spam or legitimate ham. Employs text tokenization, stop-word removal, TF-IDF vectorization, and Multinomial Naive Bayes / Random Forest classifiers to achieve high precision and recall on spam detection benchmarks.",
    tags: ["projects", "sms", "spam", "nlp", "text classification", "naive bayes", "python"],
    link: "https://github.com/JishnudipSaha",
  },
  {
    id: "proj-library-mgmt",
    title: "Library Management System",
    category: "projects",
    content: "Enterprise desktop library automation application created in Java utilizing pure Object-Oriented Programming (OOP) principles, custom data structures, and persistent file I/O operations. Features multi-user role authentication, book issue/return tracking, fine calculation, and catalog indexing.",
    tags: ["projects", "library", "java", "oop", "file io", "desktop application"],
    link: "https://github.com/JishnudipSaha/Library.Managements-007",
  },
  {
    id: "proj-eye-disease",
    title: "Eye Disease Prediction via CNN",
    category: "projects",
    content: "Deep learning project using Convolutional Neural Networks (CNNs) in TensorFlow and Keras to classify retinal eye diseases (such as Diabetic Retinopathy, CNV, DME, and Drusen) from Optical Coherence Tomography (OCT) retinal images, enabling automated diagnostic assistance.",
    tags: ["projects", "eye disease", "cnn", "deep learning", "tensorflow", "retina", "oct", "computer vision"],
    link: "https://github.com/JishnudipSaha/Eye-Disease-Prediction",
  },
  {
    id: "proj-smart-attendance",
    title: "Smart Attendance System",
    category: "projects",
    content: "Automated computer vision attendance system leveraging OpenCV face recognition algorithms and a Flask web backend. It captures classroom photos or video feeds, matches facial embeddings against registered student profiles, logs timestamps, and generates attendance reports.",
    tags: ["projects", "attendance", "opencv", "face recognition", "flask", "computer vision"],
    link: "https://github.com/JishnudipSaha/Smart-Attendance-System",
  },
  {
    id: "proj-padma-variety",
    title: "Padma Variety E-Commerce",
    category: "projects",
    content: "Modern responsive full-stack e-commerce web application built using Next.js, TypeScript, and Tailwind CSS. Implements product filtering, dynamic cart management, and clean user experience.",
    tags: ["projects", "ecommerce", "padma variety", "nextjs", "typescript", "tailwind"],
    link: "https://padma-variety.vercel.app",
  },
  {
    id: "proj-langchain-demo",
    title: "LangChain Autonomous LLM Demo",
    category: "projects",
    content: "Experimental codebase demonstrating autonomous LLM workflows, Retrieval-Augmented Generation (RAG) pipelines, prompt chaining, document embeddings, and context-aware tool agents using the LangChain framework in Python.",
    tags: ["projects", "langchain", "rag", "llm", "agents", "python", "embeddings"],
    link: "https://github.com/JishnudipSaha/LangChain_Demo",
  },
  {
    id: "proj-portfolio-lab",
    title: "Developer Portfolio & Interactive Lab",
    category: "projects",
    content: "The portfolio website you are currently viewing! Built on Next.js 16 (Turbopack), React 19, TypeScript, and Tailwind CSS. Highlights include an interactive terminal cockpit with command execution, live GitHub commit heatmap, frosted glassmorphism styling, scroll animations, synthesized Web Audio clicks, and an embedded RAG AI Assistant.",
    tags: ["projects", "portfolio", "nextjs 16", "react 19", "rag", "typescript", "glassmorphism"],
    link: "/",
  },

  // --- Achievements & Certifications ---
  {
    id: "achieve-hackerrank-gold",
    title: "HackerRank 5-Star Gold Medal in Java",
    category: "achievements",
    content: "Awarded the 5-Star Gold Medal on HackerRank for competitive problem solving in Java. Demonstrated proficiency in object-oriented architecture, advanced data structures, string manipulation, and algorithmic efficiency under rigorous execution time limits.",
    tags: ["achievements", "gold medal", "hackerrank", "java", "competition", "algorithms"],
    link: "/achievements",
  },
  {
    id: "achieve-aec-hardware",
    title: "AEC Hardware & IoT Competition",
    category: "achievements",
    content: "Selected participant and demonstrator in the AEC Hardware Competition held in Asansol, showcasing embedded systems, IoT sensor telemetry, and microcontroller integration.",
    tags: ["achievements", "hardware", "iot", "competition", "embedded systems"],
    link: "/achievements",
  },
  {
    id: "cert-google-gemini",
    title: "Build Real World AI with Gemini (Google Cloud)",
    category: "achievements",
    content: "Certified by Google Cloud (Verification ID: 14831174) in 2025. Covers Gemini multimodal reasoning, Gemini API integration, prompt orchestration, and autonomous function calling.",
    tags: ["certifications", "google", "gemini", "google cloud", "credentials", "14831174"],
    link: "/achievements",
  },
  {
    id: "cert-google-vertex",
    title: "Prompt Design in Vertex AI (Google Cloud)",
    category: "achievements",
    content: "Certified by Google Cloud (Verification ID: 14806704) in 2023. Specialized in prompt engineering techniques, few-shot conditioning, model tuning, and safety parameters in Vertex AI Studio.",
    tags: ["certifications", "google cloud", "vertex ai", "prompt design", "14806704"],
    link: "/achievements",
  },
  {
    id: "cert-google-data-decisions",
    title: "Ask Questions to Make Data-Driven Decisions (Google)",
    category: "achievements",
    content: "Official Google Career Certificate (Verification ID: DXSOTTIOFTLS) earned in 2025. Covers data-driven problem solving, hypothesis testing, analytical thinking, and stakeholder communication.",
    tags: ["certifications", "google", "data analytics", "decision making", "DXSOTTIOFTLS"],
    link: "/achievements",
  },
  {
    id: "cert-deloitte-job-sim",
    title: "Data Analytics Job Simulation (Deloitte Australia)",
    category: "achievements",
    content: "Completed the Deloitte Australia Data Analytics Simulation via Forage (Verification ID: tSnoZBedSrx5NHkLz) in 2025. Conducted forensic data modeling, client dashboard creation in Tableau, and executive reporting.",
    tags: ["certifications", "deloitte", "forage", "data analytics", "tableau", "tSnoZBedSrx5NHkLz"],
    link: "/achievements",
  },
  {
    id: "cert-codsoft-intern",
    title: "Data Science Specialization Intern (CodSoft)",
    category: "achievements",
    content: "Certified Data Science Intern at CodSoft (ID: CS25RY84986) in 2025. Successfully designed, trained, and deployed predictive ML models and automated exploratory analysis pipelines.",
    tags: ["certifications", "codsoft", "internship", "data science", "CS25RY84986"],
    link: "/achievements",
  },

  // --- Contact & Availability ---
  {
    id: "contact-availability",
    title: "Work Availability & Opportunity Status",
    category: "contact",
    content: "Jishnudip is actively looking for Software Engineering and Data Science internships, research collaborations, and impactful technical roles. He is open to remote roles as well as on-site positions in Kolkata and major tech hubs.",
    tags: ["contact", "hire", "availability", "job", "internship", "opportunities", "work", "status"],
    link: "/contact",
  },
  {
    id: "contact-channels",
    title: "Direct Contact Information",
    category: "contact",
    content: "Primary email: jishnudip.saha.2004@gmail.com (guaranteed response within 24 hours). GitHub: https://github.com/JishnudipSaha. LinkedIn: https://www.linkedin.com/in/jishnudipsaha/. Location: Kolkata, West Bengal, India (Timezone: UTC+5:30).",
    tags: ["contact", "email", "github", "linkedin", "reach out", "message", "address", "location"],
    link: "/contact",
  },
  {
    id: "contact-resume",
    title: "Resume & CV Download",
    category: "contact",
    content: "Jishnudip's updated resume is available in PDF format for direct download from the website at /Jishnudip%20Saha%20CV.pdf or via the hero button / command palette (Cmd+K).",
    tags: ["resume", "cv", "pdf", "download", "curriculum vitae", "profile"],
    link: "/Jishnudip%20Saha%20CV.pdf",
  },

  // --- Recruiter FAQs ---
  {
    id: "faq-why-hire",
    title: "Why hire Jishnudip Saha?",
    category: "faq",
    content: "Jishnudip combines deep theoretical knowledge in statistics, machine learning, and algorithms with strong full-stack software development skills. He doesn't just train ML models in notebooks—he builds the complete architecture, data processing pipeline, and production-ready web interfaces with modern frameworks like Next.js 16 and TypeScript.",
    tags: ["why hire", "strengths", "value", "recruiter", "skills", "advantages"],
    link: "/about",
  },
  {
    id: "faq-team-collab",
    title: "Collaboration & Version Control",
    category: "faq",
    content: "Jishnudip has over 450+ GitHub commits, maintains continuous integration habits, and is experienced in Git branching workflows, pull requests, issue tracking, and collaborative development in Python, Java, and TypeScript.",
    tags: ["collaboration", "git", "team", "version control", "workflow", "github"],
    link: "/#github-activity",
  },
]
