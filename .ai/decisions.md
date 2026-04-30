# Architectural Decisions Log

## Decision 1: Single User vs Multi-User Architecture
**What we chose:** Single user (no authentication)  
**Why:** Project brief specifies single user only. Multi-user would require auth, user tables, row-level security.  
**Rejected:** Multi-user auth system (Supabase, Auth0) - too complex for this scope  
**Trade-off:** Cannot scale to multiple users, but 10x faster initial development

## Decision 2: Category as String vs Separate Table
**What we chose:** Category as string column in expenses table  
**Why:** Simple, no joins needed, categories can be added anytime without schema changes  
**Rejected:** Separate `categories` table with foreign key - more normalized but overkill  
**Trade-off:** No data validation on category values, but simpler queries and less DB overhead

## Decision 3: REST API vs GraphQL
**What we chose:** REST API with fixed endpoints  
**Why:** Simple to understand, easy to test with curl/Postman, matches beginner skill level  
**Rejected:** GraphQL - too complex for this small project  
**Trade-off:** Cannot query exact fields needed, but much simpler implementation

## Decision 4: State Management: React Hooks vs Redux
**What we chose:** React hooks (useState, useContext)  
**Why:** Small app with simple state, hooks are sufficient  
**Rejected:** Redux - adds complexity without benefit for this scale  
**Trade-off:** State lifting needed for shared data, but cleaner code overall

## Decision 5: Styling: Tailwind CSS vs Custom CSS
**What we chose:** Tailwind CSS  
**Why:** Pre-built components, fast development, consistent design  
**Rejected:** Bootstrap - heavier, less customizable; Custom CSS - too slow  
**Trade-off:** HTML becomes verbose with class names, but styling is consistent and fast

## Decision 6: Database: SQLite vs PostgreSQL
**What we chose:** SQLite  
**Why:** Zero-configuration, file-based database, perfect for demo/learning projects, no installation needed  
**Rejected:** PostgreSQL - more powerful but requires separate server, adds setup complexity  
**Trade-off:** Not suitable for high-concurrency production (but not needed for this demo), but vastly simpler setup

## Decision 7: Charts/Visualization Library
**What we chose:** Simple HTML/CSS bars (no library)  
**Why:** Educational value, no external dependencies, demonstrates data visualization fundamentals  
**Rejected:** Chart.js, Recharts - heavy libraries for simple bar chart  
**Trade-off:** Limited visual options, but teaches core concepts

## Decision 8: Testing Strategy
**What we chose:** Jest unit tests + manual E2E testing  
**Why:** Covers critical paths without over-engineering  
**Rejected:** Full Cypress test suite - overkill for demo project  
**Trade-off:** Not automated end-to-end, but faster to write tests

## Decision 9: Deployment Target
**What we chose:** Local Docker containers  
**Why:** Reproducible environment, easy for colleagues to replicate  
**Rejected:** Cloud deployment (AWS, Heroku) - too expensive for demo, slower setup  
**Trade-off:** Not publicly accessible, but easier to manage locally

## Decision 10: API Error Handling
**What we chose:** Consistent JSON error responses with error codes  
**Why:** Frontend can handle different error types programmatically  
**Rejected:** Simple error strings - hard to localize or handle programmatically  
**Trade-off:** Slightly more complex backend, but better frontend UX
