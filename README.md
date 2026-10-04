# STATS EASY – Testing of Hypothesis & ANOVA Calculator

> **Mathematics LG 12 Project Presentation & Academic Defense Studio**  
> Developed by **Pinjari Manoj** (`252U1R1193`) & **Orsu Lokesh** (`252U1R1170`)

---

## 🌟 Overview
**STATS EASY** is an interactive, production-grade statistical calculation and presentation web application designed for university mathematics examinations. It follows the core syllabus flow:
$$\text{Enter Data} \longrightarrow \text{Select Test} \longrightarrow \text{Calculate} \longrightarrow \text{Show Graph} \longrightarrow \text{Explain Result}$$

### Key Modules:
1. **One-Way ANOVA Calculator:** Tests study duration impact on test marks ($1$ hr vs $2$ hrs vs $3$ hrs). Calculates Grand Total $G$, Correction Factor $CF$, $SSB$ ($1000.00$), $SSW$ ($24.00$), $MSB$ ($500.00$), $MSW$ ($2.00$), and Fisher $F$-ratio ($F = 250.00$).
2. **Standard Normal Distribution & Critical Curve:** Renders the bell curve with color-coded 95% Safe Acceptance Zone, red Critical Rejection regions, and an instant "YOU ARE HERE" pin.
3. **Single Proportion $Z$-Test:** Tests population pass rate claims (e.g., $16$ of $20$ passed = $80\%$ vs $70\%$ baseline, $Z = +0.98$).
4. **Master Dataset Explorer:** Complete $15$-student dataset with deviation metrics and clipboard export.
5. **Statistical Meanings & Plain-English Glossary:** $14$ searchable terms explaining $SSB$, $SSA$, $SSW$, $F$, $Z$, $\alpha$, $p$-value, and examiner viva scripts.
6. **Academic Project Info & Viva Cheat Sheet:** Complete project defense guide with top $4$ examiner questions.

---

## 🚀 How to Deploy on Vercel (Step-by-Step)

### Option 1: Deploy with GitHub (Recommended)
1. Push your repository to GitHub (see [Git Setup Commands](#-git-setup-commands) below).
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New Project"** and select **"Import Git Repository"**.
4. Choose your `stats-easy` repository.
5. Vercel will automatically detect the settings:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Click **"Deploy"**. Your app will be live with a free SSL `.vercel.app` URL in ~30 seconds!

### Option 2: Deploy with Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```
Follow the prompt defaults (select `Vite`, root directory `./`, build output `dist`).

---

## 🔐 Environment Variables (`.env`)

### **Are Any Environment Variables Required to Run the App?**
👉 **NO!** All calculations (ANOVA, Fisher $F$-ratio, $p$-values, Proportion $Z$-tests, SVGs, charts) are **100% client-side deterministic TypeScript calculations**.
* **Zero API keys are needed to deploy or run the calculators.**
* **Zero server costs, zero downtime, instant load.**

### Optional Environment Variables:
If you choose to enable optional Gemini AI features in the future, you can add:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
In Vercel: Go to **Project Settings** $\to$ **Environment Variables** $\to$ Add `GEMINI_API_KEY`.

---

## 💻 Git Setup Commands

Run these terminal commands in your project folder to push to GitHub:

```bash
# 1. Initialize Git repository
git init

# 2. Add all project files
git add .

# 3. Commit files
git commit -m "feat: complete Stats Easy ANOVA & Hypothesis Testing project"

# 4. Set default branch to main
git branch -M main

# 5. Connect to your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/stats-easy.git

# 6. Push code to GitHub
git push -u origin main
```

---

## 📁 Project Structure

```
├── .gitignore               # Git ignore rules (node_modules, dist, .vercel, .env)
├── .env.example             # Example environment variable file
├── index.html               # Main HTML entry with SEO metadata and Google Fonts
├── package.json             # NPM dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vercel.json              # Vercel SPA routing and build configuration
├── vite.config.ts           # Vite + Tailwind CSS v4 setup
└── src/
    ├── main.tsx             # React DOM entry point
    ├── App.tsx              # Main routing and navigation shell
    ├── index.css            # Tailwind CSS styling and theme
    └── components/
        ├── AnovaCalculatorView.tsx   # Complete One-Way ANOVA calculator & breakdown
        ├── ProportionTestView.tsx    # Single proportion Z-test calculator
        ├── DistributionCurve.tsx     # Color-coded bell curve with acceptance & rejection regions
        ├── DatasetView.tsx           # 15-student academic master dataset table
        ├── MeaningsGlossaryView.tsx  # Searchable statistical meanings dictionary
        ├── AboutProjectView.tsx      # Project defense & top 4 examiner viva Q&A
        ├── StatEasyHeader.tsx        # Sticky top navigation bar
        └── StatEasyHome.tsx          # Dashboard overview with quick action tiles
```

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript type check
npm run lint

# Build production bundle
npm run build
```
