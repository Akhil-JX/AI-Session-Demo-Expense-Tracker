# Expense Tracker — SAIL Framework Demo Project

A simple expense tracking app built using the **SAIL (Structured AI-Integrated Lifecycle)** framework. This project demonstrates all 4 phases of SAIL in a real-world context.

---

## What This Project Does

**App:** Track daily expenses, categorise them, and see spending summaries.  
**Purpose:** Teach the SAIL Framework through a complete, working example.

**Tech Stack:**
- Frontend: React 18 + TypeScript + Tailwind CSS
- Backend: Node.js + Express.js
- Database: PostgreSQL
- Testing: Jest + Playwright

---

## Before Anything Else — Read the .ai/ Folder

The `.ai/` folder is the heart of this project. Read these files first, in order:

| File | Purpose | SAIL Phase |
|------|---------|------------|
| `project_brief.md` | What we're building and why | Scope & Intent |
| `AGENTS.md` | AI's operating instructions | Architect the Context |
| `implementation_plan.md` | How the system is structured | Architect the Context |
| `decisions.md` | Why each technology was chosen | Architect the Context |
| `learnings.md` | Patterns and pitfalls discovered | Iterate & Validate |

```bash
# Read them all at once
cat .ai/project_brief.md
cat .ai/AGENTS.md
cat .ai/implementation_plan.md
cat .ai/decisions.md
cat .ai/learnings.md
```

---

## Quick Start

### Option A — Docker (Recommended)

```bash
git clone [GITHUB_REPO_URL]
cd SAIL-Demo-Project
docker-compose up -d
```

- App → http://localhost:3000  
- API → http://localhost:3001

### Option B — Local Setup

**Prerequisites:** Node.js 16+, npm, PostgreSQL 12+

```bash
git clone [GITHUB_REPO_URL]
cd SAIL-Demo-Project
npm install
npm run db:setup
npm run dev:server   # terminal 1
npm run dev:client   # terminal 2
```

- App → http://localhost:3000

---

## Project Structure

```
SAIL-Demo-Project/
├── .ai/                          ← Start here (SAIL context files)
│   ├── project_brief.md
│   ├── AGENTS.md
│   ├── implementation_plan.md
│   ├── decisions.md
│   └── learnings.md
│
├── src/
│   ├── components/               ← React components
│   │   └── ExpenseForm.tsx
│   ├── pages/                    ← Full page components
│   ├── api/
│   │   ├── expenseService.ts     ← Frontend API calls
│   │   └── expenseRoutes.js      ← Backend Express routes
│   ├── types/
│   │   └── expense.ts
│   └── App.tsx
│
├── public/
├── README.md
└── package.json
```

---

## The SAIL Lifecycle in This Project

### Phase S — Scope & Intent
**Output:** `.ai/project_brief.md`
- Core features: Add, view, delete, summarise expenses
- Out of scope: User auth, budgets, exports
- Success criteria: Add 5 expenses without a page refresh

### Phase A — Architect the Context
**Output:** `.ai/AGENTS.md`, `.ai/implementation_plan.md`, `.ai/decisions.md`
- Tech stack chosen: React + Node.js + PostgreSQL
- Code conventions defined: camelCase variables, PascalCase components
- Architecture documented: Frontend → API → Database

### Phase I — Iterate & Build
**Output:** `src/components/`, `src/api/`
- Feature 1: Add expense form — built as one vertical slice
- Feature 2: Expense list with delete — built as the next slice
- Each slice: Prompt → Generate → Explain-Back → Refine

### Phase L — Look & Validate
**Output:** `.ai/learnings.md`, production-ready code

Security lens ✅ — No hardcoded secrets, SQL injection prevention  
Logic lens ✅ — Form validates, delete works, totals correct  
Context lens ✅ — Follows AGENTS.md naming and conventions  
Maintainability ✅ — Readable code, no unexplained logic

---

## Running Tests

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration
```

**Manual checklist (Phase L):**
- [ ] Add an expense with all fields
- [ ] Add an expense without a description
- [ ] Try submitting with an empty amount → error shown
- [ ] Try a negative amount → error shown
- [ ] Delete an expense → confirmation dialog appears
- [ ] Refresh the page → data persists
- [ ] Check on mobile screen size

---

## Common Mistakes This Project Demonstrates

| Mistake | What Goes Wrong | SAIL Solution |
|---------|----------------|---------------|
| Skipping Phase S | AI builds the wrong feature | Always write `project_brief.md` first |
| No context files | AI generates inconsistent code | Mandatory `AGENTS.md` before prompting |
| One giant prompt | Broken, monolithic output | Build one vertical slice at a time |
| Shipping without review | Security bugs go to production | Mandatory Phase L checklist |

---

**Built with SAIL Framework v2.0 · Coined by Sreelakshmi · 2026**
