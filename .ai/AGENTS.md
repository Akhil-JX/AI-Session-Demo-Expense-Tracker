# AGENTS.md - AI Operating Instructions

## Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: SQLite (file-based, zero-configuration)
- **Package Manager**: npm
- **API Format**: REST with JSON
- **Testing**: Jest for unit tests, Playwright for E2E

## Code Style & Conventions

### Naming Conventions
- **Files**: kebab-case for files (e.g., `expense-form.tsx`)
- **Variables**: camelCase (e.g., `totalExpense`)
- **Constants**: UPPER_CASE (e.g., `API_BASE_URL`)
- **React Components**: PascalCase (e.g., `ExpenseForm`)
- **Database tables**: snake_case (e.g., `expense_items`)

### File Structure
```
src/
  components/        (React components)
  pages/            (Full page components)
  api/              (API calls and services)
  hooks/            (Custom React hooks)
  types/            (TypeScript type definitions)
  utils/            (Helper functions)
  styles/           (Global styles)
```

### Component Pattern
- Functional components only (no class components)
- Use hooks for state management
- Props should be typed with TypeScript
- Keep components small (under 200 lines)
- One component per file

### Database Naming
- Tables: `plural_snake_case` (e.g., `expenses`)
- Columns: `snake_case` (e.g., `created_at`)
- Primary keys: `id` (auto-increment)
- Foreign keys: `{table_name}_id` (e.g., `user_id`)

## Do's ✅
- Use TypeScript for type safety
- Write descriptive variable names
- Add comments only for WHY, not WHAT
- Keep functions small and focused
- Use React hooks (useState, useEffect, etc.)
- Validate input on both frontend and backend
- Use environment variables for config
- Write meaningful commit messages
- Test before committing

## Don'ts ❌
- Don't use `any` type in TypeScript
- Don't mutate state directly
- Don't use `var`, use `const` or `let`
- Don't hardcode API URLs
- Don't skip error handling
- Don't use console.log in production code
- Don't create multiple responsibility components
- Don't use inline styles (use Tailwind CSS)

## API Conventions
- Base URL: `/api/v1`
- All responses return JSON
- Success: HTTP 200-201
- Errors: Proper HTTP status codes (400, 404, 500)
- Error format: `{ error: "message", code: "ERROR_CODE" }`

## How to Run, Test, Build
```bash
# Development
npm install
npm run dev

# Testing
npm test

# Build
npm run build

# Database migrations
npm run db:migrate
```

## Known Issues & Constraints
- React development server requires port 3000
- PostgreSQL must be running before starting backend
- CORS is configured for localhost:3000 only
- Session data is stored in memory (not persistent)
