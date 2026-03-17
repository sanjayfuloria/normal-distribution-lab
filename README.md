# Normal Distribution Lab

Interactive learning environment for MBA students — with theory, simulations, worked examples, quizzes, and **live Python/R code execution in the browser**.

## Features

- **Interactive Explorer** — Adjustable μ/σ sliders, shaded area probability, compare distributions
- **68-95-99.7 Rule** — Animated visualization with hover highlights
- **5 Worked Examples** — Business scenarios with step-by-step solutions
- **Probability Calculator** — P(X), inverse CDF, Z-scores
- **10-Question Quiz** — Instant feedback with explanations
- **Code Lab** — Editable Python (Pyodide) and R (webR) sandboxes running in the browser

## Deploy to Vercel

```bash
git init && git add . && git commit -m "Normal Distribution Lab"
git remote add origin https://github.com/YOUR_USERNAME/normal-distribution-lab.git
git branch -M main
git push -u origin main --force
```

Then import the repo at [vercel.com](https://vercel.com) — it auto-detects Vite.

## Local Development

```bash
npm install
npm run dev
```

## Tech Stack

React 18 + Vite, Tailwind CSS, KaTeX (math rendering), Pyodide (Python WASM), webR (R WASM)
