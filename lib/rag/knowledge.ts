export interface KnowledgeChunk {
  id: string
  title: string
  category: "bio" | "education" | "skills" | "projects" | "experience" | "achievements" | "contact" | "faq"
  content: string
  tags: string[]
  link?: string
}

export const portfolioKnowledgeBase: KnowledgeChunk[] = [
  // --- Professional Bio & Summary ---
  {
    id: "bio-summary",
    title: "About Jishnudip Saha (Summary)",
    category: "bio",
    content: "I am Jishnudip Saha, a dedicated Data Science student with a strong foundation in Python, machine learning, and data analysis. I have hands-on experience building end-to-end projects from data preprocessing to model evaluation. I am passionate about solving real-world problems using data-driven approaches and continuously learning emerging AI and analytics technologies.",
    tags: ["bio", "about", "whoami", "jishnudip", "summary", "profile", "student", "developer", "data science"],
    link: "/about",
  },

  // --- Education & Academic Performance ---
  {
    id: "edu-btech",
    title: "Bachelor of Technology (B.Tech) - Narula Institute of Technology",
    category: "education",
    content: "I am pursuing my Bachelor of Technology (B.Tech) in Computer Science and Engineering at Narula Institute of Technology, Kolkata (08/2023 – Present). My current academic performance is CGPA: 8.08 (upto 5th semester). My coursework includes Machine Learning, Data Structures, Algorithms, DBMS, and Distributed Systems.",
    tags: ["education", "college", "btech", "cse", "computer science", "narula", "nit", "cgpa", "8.08", "academics", "semester", "degree"],
    link: "/about",
  },
  {
    id: "edu-higher-secondary",
    title: "Higher Secondary (Class 12) - Sudhir Memorial Institute",
    category: "education",
    content: "I completed my Higher Secondary (HS / Class 12) education from Sudhir Memorial Institute, Kolkata (04/2022 – 04/2023), achieving a score of 89.02%.",
    tags: ["education", "higher secondary", "12th", "hs", "sudhir memorial institute", "school", "89.02", "academics", "marks"],
    link: "/about",
  },
  {
    id: "edu-secondary",
    title: "Secondary Education (Class 10) - St. Xavier's Institute",
    category: "education",
    content: "I completed my Secondary (Class 10) education from St. Xavier's Institute (04/2020 – 04/2021), achieving a score of 90.25%.",
    tags: ["education", "secondary", "10th", "st xaviers institute", "school", "90.25", "academics", "marks"],
    link: "/about",
  },

  // --- Technical Skills ---
  {
    id: "skills-languages",
    title: "Programming Languages",
    category: "skills",
    content: "My core programming languages are: Java, Python, and C/C++. I use Python for data science, machine learning, and API development; Java for object-oriented systems and algorithmic problem solving; and C/C++ for core algorithmic and system fundamentals.",
    tags: ["skills", "languages", "python", "java", "c", "c++", "programming"],
    link: "/about",
  },
  {
    id: "skills-databases",
    title: "Database Management",
    category: "skills",
    content: "Database Management: SQL, MySQL, and PostgreSQL. I have experience designing relational schemas, writing complex queries, and integrating PostgreSQL with backend services like FastAPI.",
    tags: ["skills", "database", "sql", "mysql", "postgresql", "dbms"],
    link: "/about",
  },
  {
    id: "skills-frameworks-libraries",
    title: "Frameworks & Libraries",
    category: "skills",
    content: "My primary frameworks and libraries: FastAPI (modern asynchronous REST APIs), Scikit-learn (machine learning models, preprocessing, ROC-AUC evaluation), Pandas (data manipulation and analysis), NumPy (numerical computing and array operations), and OpenCV (computer vision).",
    tags: ["skills", "frameworks", "fastapi", "scikit-learn", "pandas", "numpy", "opencv", "libraries"],
    link: "/about",
  },
  {
    id: "skills-tools-platforms",
    title: "Tools & Platforms",
    category: "skills",
    content: "Tools and Platforms: Git, GitHub (version control, collaboration, CI workflows), Docker (containerization for reproducible microservices and deployments), and DVC (Data Version Control for ML dataset and pipeline tracking).",
    tags: ["skills", "tools", "git", "github", "docker", "dvc", "data version control", "platforms"],
    link: "/about",
  },

  // --- Verified Certificates ---
  {
    id: "cert-nptel-java",
    title: "Programming in Java (NPTEL)",
    category: "achievements",
    content: "Certified in Programming in Java by NPTEL with an outstanding score of 92/100. Demonstrated deep mastery of Java OOP concepts, concurrency, exception handling, data structures, and algorithmic execution.",
    tags: ["certificates", "certifications", "nptel", "java", "92/100", "score", "credentials"],
    link: "/achievements",
  },
  {
    id: "cert-google-aiml",
    title: "Google AI-ML Virtual Internship (EduSkills & AICTE)",
    category: "achievements",
    content: "Completed the Google AI-ML Virtual Internship conducted by EduSkills in collaboration with AICTE. Secured 100% marks, demonstrating comprehensive proficiency in machine learning foundations, neural models, and AI pipelines.",
    tags: ["certificates", "certifications", "google", "ai", "ml", "virtual internship", "eduskills", "aicte", "100% marks"],
    link: "/achievements",
  },
  {
    id: "cert-internships",
    title: "Data Science Internship Certifications (EdiGlobe & ShadowFox)",
    category: "achievements",
    content: "Awarded official Data Science Internship completion certificates by both EdiGlobe and ShadowFox for delivering production machine learning pipelines and exploratory data analysis.",
    tags: ["certificates", "certifications", "ediglobe", "shadowfox", "internship certificate"],
    link: "/achievements",
  },

  // --- Featured Projects ---
  {
    id: "proj-eye-disease-oct",
    title: "Eye Disease Detection using Deep Learning (OCT Images)",
    category: "projects",
    content: "I developed a Deep Learning model to detect and classify retinal eye diseases using Optical Coherence Tomography (OCT) retinal images. The system automates diagnostic classification from high-resolution clinical scans, assisting healthcare workflows.",
    tags: ["projects", "eye disease", "oct", "deep learning", "optical coherence tomography", "cnn", "retina", "computer vision"],
    link: "https://github.com/JishnudipSaha/Eye-Disease-Prediction",
  },
  {
    id: "proj-titanic-dvc",
    title: "Titanic Disaster Prediction Model using DVC",
    category: "projects",
    content: "Developed a machine learning model to predict passenger survival using the Titanic dataset. Implemented a robust data versioning pipeline using DVC (Data Version Control) to track datasets, model versions, and experiments. Performed comprehensive data preprocessing, feature engineering, and model training using Python and Scikit-learn. Built a structured ML workflow ensuring reproducibility of training and evaluation stages.",
    tags: ["projects", "titanic", "dvc", "data version control", "machine learning", "scikit-learn", "reproducibility", "pipeline"],
    link: "/projects",
  },
  {
    id: "proj-smart-attendance",
    title: "AI-Powered Smart Attendance System",
    category: "projects",
    content: "Developed an enterprise AI-powered attendance system for multi-face classroom recognition and automated attendance marking. Tech Stack: FastAPI, PostgreSQL, RetinaFace, InsightFace, OpenCV, and Docker. Built a modular FastAPI backend with facial embedding generation, automated attendance management, and PostgreSQL integration. Implemented RetinaFace and ArcFace-based facial recognition utilizing cosine similarity and confidence thresholding.",
    tags: ["projects", "smart attendance", "fastapi", "postgresql", "retinaface", "insightface", "arcface", "opencv", "docker", "face recognition"],
    link: "/projects",
  },

  // --- Work Experience & Internships ---
  {
    id: "exp-ediglobe",
    title: "Data Science Intern at EdiGlobe (09/2025 – 10/2025, Kolkata)",
    category: "experience",
    content: "During my Data Science Internship at EdiGlobe in Kolkata: Worked on the Titanic survival prediction model, achieving 97% accuracy through advanced feature engineering and hyperparameter tuning. Built and trained an end-to-end Spam-Ham text classification model for message filtering.",
    tags: ["experience", "internship", "ediglobe", "titanic", "97% accuracy", "spam", "ham", "nlp", "kolkata"],
    link: "/about",
  },
  {
    id: "exp-shadowfox",
    title: "Data Science Intern at ShadowFox (08/2025 – 10/2025, Kolkata)",
    category: "experience",
    content: "During my Data Science Internship at ShadowFox in Kolkata: Worked on data preprocessing, feature engineering, and model training. Built and evaluated machine learning models using Python and Scikit-learn for predictive analysis tasks. Performed exploratory data analysis (EDA) to identify trends, patterns, and insights from real-world datasets. Assisted in feature engineering and model performance optimization using evaluation metrics like accuracy and ROC-AUC.",
    tags: ["experience", "internship", "shadowfox", "eda", "feature engineering", "roc-auc", "scikit-learn", "kolkata"],
    link: "/about",
  },

  // --- Contact & Location ---
  {
    id: "contact-info",
    title: "Contact Information & Availability",
    category: "contact",
    content: "I am actively seeking Software Engineering and Data Science internships and technical opportunities. Location: Kolkata (1/41/1, Jatindas Nagar, Belgharia, Kolkata). Email: jishnudip.saha.2004@gmail.com. LinkedIn: linkedin.com/in/jishnudipsaha. GitHub: github.com/JishnudipSaha.",
    tags: ["contact", "email", "location", "kolkata", "belgharia", "linkedin", "github", "hire", "availability", "internship"],
    link: "/contact",
  },
  {
    id: "contact-resume-pdf",
    title: "Resume & CV Download",
    category: "contact",
    content: "My updated resume is available in PDF format for download directly from the website at /Jishnudip%20Saha%20CV.pdf.",
    tags: ["resume", "cv", "pdf", "download"],
    link: "/Jishnudip%20Saha%20CV.pdf",
  },
]
