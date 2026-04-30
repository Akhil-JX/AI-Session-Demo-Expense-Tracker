# Expense Tracker - SAIL Framework Demo Project

A simple expense tracking application built using the **SAIL (Structured AI-Integrated Lifecycle)** framework. This project demonstrates all 4 phases of SAIL in a real-world context.

## 🎯 Project Overview

**What it does:** Track daily expenses, categorize them, and see spending summaries.

**Why it exists:** To teach the SAIL Framework through a complete, working example.

**Tech Stack:**
- Frontend: React 18 + TypeScript + Tailwind CSS
- Backend: Node.js + Express.js
- Database: PostgreSQL
- Testing: Jest + Playwright

---

## 📂 The SAIL Framework Context Files

These files in the `.ai/` folder are the core of this project. **Read them first!**

| File | Purpose | Phase |
|------|---------|-------|
| `project_brief.md` | What we're building | **Scope & Intent** |
| `AGENTS.md` | AI's operating instructions | **Architecture** |
| `implementation_plan.md` | How the system works | **Architecture** |
| `decisions.md` | Why we chose each technology | **Architecture** |
| `learnings.md` | Patterns and pitfalls discovered | **Iterate & Validate** |

**Start here:** Open `.ai/project_brief.md` and read all 5 files.

---

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js 16+ and npm
- PostgreSQL 12+
- Docker (optional, for easier setup)

### Option 1: Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up database
npm run db:setup

# 3. Start backend
npm run dev:server

# 4. In another terminal, start frontend
npm run dev:client

# 5. Open http://localhost:3000
```

### Option 2: Docker (Recommended)

```bash
# Build and run with Docker Compose
docker-compose up -d

# App runs on http://localhost:3000
# API runs on http://localhost:3001
```

---

## 📖 How to Learn SAIL from This Project

### Step 1: Understand the Requirements (15 min)
```bash
cat .ai/project_brief.md
```
**Questions to ask:**
- What are the core features?
- What's explicitly NOT included?
- Who's the user?

### Step 2: Study the Architecture (20 min)
```bash
cat .ai/AGENTS.md
cat .ai/implementation_plan.md
```
**Questions to ask:**
- Why React + Node.js + SQLlite?
- How do components communicate?
- What's the database structure?


### Step 3: Study the implementation plan (20 min)
```
**Questions to ask:**
- Does the code follow AGENTS.md conventions?
- Where's the validation?
- Where's the error handling?

### Step 4: Read Decisions & Learnings (10 min)
```bash
cat .ai/decisions.md
cat .ai/learnings.md
```
**Questions to ask:**
- Why not use GraphQL?
- Why not use Redux?
- What pitfalls were discovered?

---


## 💻 Project Structure

```
SAIL-Demo-Project/
├── .ai/                              ← Context files (SAIL heart)
│   ├── project_brief.md             ← Phase 1: Requirements
│   ├── AGENTS.md                    ← Phase 2: Instructions
│   ├── implementation_plan.md        ← Phase 2: Architecture
│   ├── decisions.md                 ← Phase 2: Why we chose each thing
│   └── learnings.md                 ← Phase 3&4: Patterns & pitfalls
│
├── src/
│   ├── components/                   ← React components
│   │   └── ExpenseForm.tsx
│   ├── pages/                        ← Full page components
│   ├── api/                          ← API client and routes
│   │   ├── expenseService.ts        ← Frontend API calls
│   │   └── expenseRoutes.js         ← Backend Express routes
│   ├── types/                        ← TypeScript definitions
│   │   └── expense.ts
│   └── App.tsx
│
├── public/                           ← Static assets
├── docs/                             ← Additional documentation
├── README.md                         ← This file
└── package.json                      ← Dependencies
```

---

## 🔄 The SAIL Lifecycle in This Project

### Phase 1: Scope & Intent ✅
**Input:** User request: "Build an expense tracker"  
**Process:** Define clear requirements  
**Output:** `.ai/project_brief.md`
```
What we're building: Expense Tracker
Core features: Add, view, delete, summarize expenses
Out of scope: User auth, budgets, exports
Success criteria: Add 5 expenses without refresh
```

### Phase 2: Architect the Context ✅
**Input:** Requirements from Phase 1  
**Process:** Design architecture and document for AI  
**Output:** `.ai/AGENTS.md`, `.ai/implementation_plan.md`, `.ai/decisions.md`
```
Tech stack: React + Node.js + Sqllite
Code style: camelCase variables, PascalCase components
Architecture: Frontend → API → Database
Why these choices: Simplicity, learning value, production-ready
```

### Phase 3: Iterate & Build ✅
**Input:** Architecture from Phase 2  
**Process:** Build one feature at a time with AI  
**Output:** `src/components/`, `src/api/`
```
Feature 1: Add expense form
  - Prompt: "Build form with validation"
  - Generate: ExpenseForm.tsx
  - Review: Check validation, UI, error handling
  - Refine: Ask for improvements

Feature 2: Display expenses list
  - Prompt: "Build expense list with delete buttons"
  - Generate: ExpensesList.tsx
  - Review: Check data binding, delete logic
  - Refine: Add empty state, loading state
```

### Phase 4: Look & Validate ✅
**Input:** Generated code from Phase 3  
**Process:** Human review using 4-lens checklist  
**Output:** `.ai/learnings.md`, production-ready code
```
Security Lens: ✅ No hardcoded secrets, SQL injection prevention
Logic Lens: ✅ Form validates, delete works, totals correct
Context Lens: ✅ Follows naming conventions, uses agreed tech stack
Maintainability: ✅ Code is readable, no magic

Learnings captured:
- Always validate on both frontend and backend
- Use decimal types for money, not float
- Add database indexes on frequently sorted columns
```

---

## 🧪 Testing

### Run Unit Tests
```bash
npm test
```

### Run Integration Tests
```bash
npm run test:integration
```

### Manual Testing Checklist (Phase 4)

- [ ] Add an expense (all fields)
- [ ] Add an expense (without description)
- [ ] Try to add with empty amount → see error
- [ ] Try to add with negative amount → see error
- [ ] See expense in list immediately
- [ ] Delete an expense → confirmation dialog
- [ ] See updated category totals
- [ ] Refresh page → data persists
- [ ] Check responsive design on mobile

---

## 🔒 Security Checklist (Phase 4)

✅ **No hardcoded secrets** - All config in environment variables  
✅ **SQL injection prevention** - Parameterized queries used  
✅ **Input validation** - Both frontend and backend validate  
✅ **CORS configured** - Only localhost:3000 allowed  
✅ **Error messages** - No sensitive data leaked  

---

## 📊 Real Example: Building "Edit Expense" Feature

To see SAIL in action, here's how to build a new feature:

### Step 1: Update Phase 1 (Scope)
Edit `.ai/project_brief.md`:
```markdown
## Core Features (Must Do)
- Add, view, delete, summarize expenses
- **EDIT an existing expense** ← New!
```

### Step 2: Update Phase 2 (Architecture)
Edit `.ai/implementation_plan.md`:
```markdown
## New Endpoints
PUT /api/v1/expenses/:id - Update an expense

## New Component
EditExpenseForm - Similar to ExpenseForm but pre-populated
```

### Step 3: Build Phase 3 (Code)
Write the prompt:
```
"Build an EditExpenseForm component following AGENTS.md conventions.
It should pre-populate fields with existing expense data.
Use the same validation as ExpenseForm.
Reference implementation_plan.md for API endpoint details.
Show me the plan first before generating code."
```

### Step 4: Validate Phase 4
Review with 4-lens checklist:
- Security: No SQL injection, proper input validation
- Logic: Form loads data, updates correctly, handles errors
- Context: Follows naming, uses Tailwind, matches ExpenseForm style
- Maintainability: Clear variable names, understandable logic

### Step 5: Update Learnings
Edit `.ai/learnings.md`:
```markdown
## New Learning: Edit vs Create Forms

When building edit forms, pre-populate with existing data.
If user cancels, confirm before losing changes.
Disable form while saving to prevent double-submit.
```

---

## 🚨 Common Mistakes (Learn from These!)

### Mistake 1: Skipping Phase 1
**What happens:** Build the wrong feature  
**Example:** Start coding before asking "What's out of scope?"  
**Prevention:** Always write project_brief.md first

### Mistake 2: No Context Files (Phase 2)
**What happens:** AI generates inconsistent code  
**Example:** One component uses camelCase, another uses PascalCase  
**Prevention:** Mandatory AGENTS.md and implementation_plan.md

### Mistake 3: Building Whole System at Once (Phase 3)
**What happens:** AI generates broken monolithic code  
**Example:** "Build entire expense tracker in one prompt"  
**Prevention:** Always build one feature slice at a time

### Mistake 4: Shipping Without Review (Phase 4)
**What happens:** Security bugs and logic errors in production  
**Example:** AI-generated SQL without validation → SQL injection  
**Prevention:** Mandatory 4-lens review before shipping


## 🤔 Frequently Asked Questions

**Q: Is this overkill for such a simple app?**  
A: Yes and no. For 1 person building in 1 day, maybe. For a team building over months, SAIL saves enormous time. This project demonstrates principles that scale to 10x larger codebases.

**Q: Do I need all 5 context files?**  
A: Yes! Each solves a specific problem:
- project_brief.md: Prevents building the wrong thing
- AGENTS.md: Prevents inconsistent code
- implementation_plan.md: Prevents architectural chaos
- decisions.md: Prevents repeating wrong choices
- learnings.md: Prevents repeating mistakes

**Q: Can we use SAIL with my AI tool (ChatGPT, Copilot, etc)?**  
A: Yes! SAIL is tool-agnostic. The context files work with any AI assistant.

**Q: What if requirements change?**  
A: Update project_brief.md! That's the whole point. Everything else flows from requirements.

**Q: Does SAIL slow down development?**  
A: Yes initially (2-3 hours for Phases 1-2). But it saves weeks in rework, debugging, and team alignment.

---

## 🎯 Next Steps

1. **Read the context files** (`.ai/` folder) - 45 minutes
2. **Run the code** locally - 15 minutes
3. **Study the components** to see SAIL in action - 30 minutes
4. **Try building an enhancement** using SAIL - 2-3 hours
5. **Present to your team** - 1 hour
6. **Make SAIL your team standard** - Ongoing

---

## 📝 License

This is a learning project. Use it freely for educational purposes.

---

**Built with SAIL Framework v1.0**  
*Making AI-assisted development structured, reliable, and scalable.*
