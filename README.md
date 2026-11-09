# ⚡ Jishnudip Saha | Developer Portfolio & Interactive Engineering Lab

[![Next.js](https://img.shields.io/badge/Next.js-16.2.11-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

A high-performance, developer-centric portfolio designed with an **interactive terminal cockpit**, **frosted glassmorphic UI**, **scroll-triggered animations**, and **hacker-tier telemetry**. Built for showcasing data science research, machine learning models, and full-stack software engineering.

🌐 **Live Website:** [jishnudip-saha-portfolio-website.vercel.app](https://jishnudip-saha-portfolio-website.vercel.app/)

---

## 🌟 Key Features

### 🖥️ Interactive Developer Cockpit & Terminal
- **Interactive Bash Shell**: Visitors can test drive an interactive terminal emulator with real commands:
  - `whoami`: Displays identity, title, and mission.
  - `skills`: Lists full-stack, machine learning, and core language proficiencies.
  - `projects`: Highlights key repositories with direct routing.
  - `about`: Outlines academic background and career goals.
  - `contact`: Provides direct communication channels.
  - `sudo hire-me`: Secret shortcut for recruiter fast-tracking.
  - `clear`: Flushes the command history.
- **Automated Typing Sequence**: Scroll-triggered character-by-character typing with natural keystroke timing, block cursor blinking, and suggested quick-action chips.
- **Multi-Tab IDE Preview**: Switch between `bash ~ terminal`, `developer.ts` (TypeScript schema), and `model.py` (Scikit-Learn / PyTorch pipeline).

### 🔮 Modern Glassmorphic Design System
- **Specular Top Light Reflections**: Subtle gradient specular lines along container tops (`.specular-border`) simulating frosted refractive glass.
- **Multi-Layer Blur**: `backdrop-blur-xl` and `backdrop-blur-2xl` glass panels layered over cyber-grid background grids and neon violet/cyan glow orbs.
- **Cyberpunk Color Palette**: High-contrast dark theme powered by Cyber Purple (`#a855f7`), Electric Cyan (`#06b6d4`), and Status Emerald (`#10b981`).

### ⌨️ Developer Command Palette (`⌘K` / `Ctrl+K`)
- Instant keyboard-first navigation modal.
- Search and jump across routes (`Home`, `About`, `Projects`, `Achievements`, `Contact`).
- Quick actions: Download CV (PDF), copy direct email, open GitHub, and visit LinkedIn.

### 📊 Git Activity & Commit Velocity Heatmap
- Visual contribution heatmap representing continuous software delivery across 26 weeks.
- Streak counters, commit telemetry, and interactive hover tooltips for every day.

### 🛠️ Interactive Tech Stack Matrix
- Categorized filter tabs: *All Stack, Languages, AI & Data Science, Web Frameworks, Tools & DBs*.
- Live instant search bar filtering by keyword (e.g., `Python`, `TensorFlow`, `Next.js`).
- Proficiency meters and experience tags for each technology.

### 🌊 Scroll Animations & Micro-Interactions
- **Viewport Scroll Progress Bar**: Pinned gradient indicator tracking progress down the page.
- **Circular Scroll-to-Top**: Floating glass button with an SVG progress ring that appears after scrolling down.
- **Smooth Stagger Reveals**: Intersection-observer powered component entries with zero layout shifts.
- **Tactile Audio Feedback**: Pure Web Audio API synthesized mechanical keyboard clicks (zero external audio asset dependencies).
- **Custom Desktop Cursor**: Physics-smoothed magnetic cursor dot and outer ring with interactive hover states.

---

## 📂 Project Architecture

```
portfolio/
├── app/
│   ├── about/              # Bio, experience timeline, and detailed credentials
│   │   └── page.tsx
│   ├── achievements/       # Contests, medals, and verified Google/Deloitte certs
│   │   └── page.tsx
│   ├── contact/            # Encrypted dispatch terminal form & direct links
│   │   └── page.tsx
│   ├── projects/           # Categorized repository showcase with search
│   │   └── page.tsx
│   ├── global-error.tsx    # Cyberpunk-themed 500 runtime error boundary
│   ├── globals.css         # Glassmorphism, animations, cyber-grid & syntax styles
│   ├── layout.tsx          # Root layout with navigation, progress, & meta
│   ├── not-found.tsx       # Custom 404 Null Pointer Exception page
│   └── page.tsx            # Main landing page & Developer Cockpit
├── components/
│   ├── animated-counter.tsx # Viewport-triggered animated number counters
│   ├── code-rain.tsx       # Matrix digital rain canvas
│   ├── command-palette.tsx # Ctrl+K global keyboard navigation modal
│   ├── custom-cursor.tsx   # Physics-smoothed custom mouse cursor
│   ├── floating-elements.tsx # Ambient code tokens floating in background
│   ├── github-activity.tsx # Contribution graph & velocity telemetry
│   ├── gradient-text.tsx   # Neon gradient typography helper
│   ├── navigation.tsx      # Floating frosted-glass island navbar
│   ├── project-card.tsx    # Terminal git repository cards with demo links
│   ├── rolling-text.tsx    # Dynamic animated developer title rotator
│   ├── scroll-progress.tsx # Top gradient scroll indicator
│   ├── scroll-to-top.tsx   # Circular progress back-to-top button
│   ├── section-wrapper.tsx # Smooth viewport-triggered scroll reveals
│   ├── sound-effects.ts    # Web Audio API tactile mechanical click synthesizer
│   ├── tech-stack-matrix.tsx # Filterable skills & proficiency matrix
│   └── terminal-window.tsx # Multi-tab interactive terminal & code lab
├── public/                 # Static assets, project imagery, and CV PDF
├── tailwind.config.ts      # Custom theme extensions, neon colors, & glass shadows
└── tsconfig.json           # TypeScript compiler configuration
```

---

## 🛠️ Tech Stack & Dependencies

| Category | Technology |
|---|---|
| **Core Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/), Custom Glass Utilities |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Audio Engine** | Web Audio API (Synthesized in-browser) |
| **Form Dispatch** | Formspree REST API |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18.18.0
- **npm** or **pnpm**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JishnudipSaha/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
To create an optimized production build:
```bash
npm run build
npm run start
```

---

## 👨‍💻 Author

**Jishnudip Saha**
- 🎓 B.Tech in Computer Science (Data Science) — *Narula Institute of Technology*
- 🐙 GitHub: [@JishnudipSaha](https://github.com/JishnudipSaha)
- 💼 LinkedIn: [in/jishnudipsaha](https://www.linkedin.com/in/jishnudipsaha/)
- 📧 Email: [jishnudip.saha.2004@gmail.com](mailto:jishnudip.saha.2004@gmail.com)

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
