# HirePortal — Job Board & Profile Completion UI

A responsive React.js application built for the InAmigos Foundation assignment.

## 🚀 Live Demo
Deploy to Vercel in one click (see below).

---

## 📁 Project Structure

```
hire-portal/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx          ← entire app in one file
│   └── index.js
├── package.json
└── README.md
```

> **Single-file approach:** All components, data, styles and logic live in `src/App.jsx`
> for easy review and submission. No external UI libraries — pure React + inline CSS.

---

## ✨ Features

### Job Board Screen
- 10 mock job postings with company, location, salary, tags
- **Live search** across title, company, location, and skill tags
- **Filter by job type** (All / Full-time / Part-time / Internship / Contract)
- Apply / Unapply toggle with per-card state
- Responsive grid (auto-fills columns; stacks to 1 column on mobile)

### Profile Completion Screen
- **Profile Picture Upload** with live preview
- **Resume Upload** (PDF / DOC / DOCX) with filename + size display
- **Progress bar + chip indicators** — updates live as fields are filled
- Color-coded strength: 🔴 < 40% → 🟡 < 70% → 🟢 100%
- **Form validation** (on blur + on submit):
  - Full Name — required, min 2 chars
  - Email — valid format check
  - Phone — 10-digit number
  - Skills — at least one required
  - Education — required
- Skill tags rendered live as comma-separated pills
- Save confirmation banner on success

---

## 🛠 Setup & Running Locally

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/hire-portal.git
cd hire-portal

# 2. Install dependencies
npm install

# 3. Start dev server
npm start
# → opens http://localhost:3000
```

## 🌐 Deploy to Vercel

```bash
npm install -g vercel
npm run build
vercel --prod
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments.

---

## 🧠 Technical Approach

| Concern | Approach |
|---|---|
| Framework | React 18, functional components + hooks |
| Styling | Injected `<style>` tag with CSS variables, no external lib |
| State | `useState` for form, filters, applied set, photo/resume |
| Validation | Blur-triggered + full submit validation, errors shown inline |
| Responsiveness | CSS Grid `auto-fill minmax`, media query at 600px |
| Fonts | Google Fonts — Fraunces (display) + DM Sans (body) |

---

## 📋 Evaluation Checklist

- [x] React.js functional components & hooks
- [x] Component structure (Badge, JobCard, JobBoard, ProfileCompletion, App)
- [x] Clean, readable code with comments
- [x] Responsive design (desktop + mobile)
- [x] UI/UX with hover states, transitions, color feedback
- [x] Form validation with inline error messages
- [x] State management via useState
