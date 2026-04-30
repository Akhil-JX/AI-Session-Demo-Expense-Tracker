# Implementation Plan - Architecture Blueprint

## System Overview
```
┌─────────────────────────────────────────────────────────────┐
│                     REACT FRONTEND                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Dashboard  │  │   Expenses   │  │  Categories  │      │
│  │   Component  │  │   List       │  │  Summary     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTP REST API
┌─────────────────────────────────────────────────────────────┐
│              EXPRESS BACKEND SERVER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  GET /api/   │  │  POST /api/  │  │  DELETE /api│      │
│  │  expenses    │  │  expenses    │  │  /expenses/:id     │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓ SQL Queries
┌─────────────────────────────────────────────────────────────┐
│              POSTGRESQL DATABASE                            │
│  ┌──────────────────────────────────────────────────┐       │
│  │  expenses table                                  │       │
│  │  - id (PK)                                       │       │
│  │  - amount (decimal)                              │       │
│  │  - category (varchar)                            │       │
│  │  - description (text)                            │       │
│  │  - created_at (timestamp)                        │       │
│  │  - updated_at (timestamp)                        │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Structure

### Pages
- **Dashboard** (`pages/Dashboard.tsx`)
  - Shows total spending for current month
  - Shows breakdown by category (pie chart or summary)
  - Link to add new expense

- **Expenses List** (`pages/ExpensesList.tsx`)
  - Table view of all expenses
  - Sort by date (newest first)
  - Delete button for each expense

### Components
- **ExpenseForm** (`components/ExpenseForm.tsx`)
  - Input fields: amount, category, description
  - Submit button
  - Form validation

- **ExpenseItem** (`components/ExpenseItem.tsx`)
  - Display single expense
  - Delete button
  - Date formatted nicely

- **CategorySummary** (`components/CategorySummary.tsx`)
  - Show total by category
  - Visual representation (bar or pie)

### API Service Layer
- **api/expenseService.ts**
  - `getExpenses()` - Fetch all expenses
  - `addExpense(data)` - Create new expense
  - `deleteExpense(id)` - Remove an expense
  - `getCategorySummary()` - Get totals by category

## Backend Structure

### API Endpoints

| Method | Endpoint | Purpose | Returns |
|--------|----------|---------|---------|
| GET | `/api/v1/expenses` | Get all expenses | Array of expenses |
| POST | `/api/v1/expenses` | Create new expense | Created expense object |
| DELETE | `/api/v1/expenses/:id` | Delete expense | Success message |
| GET | `/api/v1/expenses/summary/category` | Get category totals | Object with category totals |

### Routes (`routes/expenseRoutes.ts`)
- Handles all expense-related endpoints
- Validates input
- Calls database layer

### Database Service (`services/expenseService.ts`)
- Query builder for PostgreSQL
- Handles all database operations
- Returns formatted data

## Database Schema

### expenses table
```sql
CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  amount DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Indexes
- Primary key on `id`
- Index on `created_at` for sorting
- Index on `category` for filtering

## Data Flow Example: Adding an Expense

```
User fills form
      ↓
ExpenseForm component validates input
      ↓
Calls expenseService.addExpense(data)
      ↓
POST request to /api/v1/expenses
      ↓
Backend validates again
      ↓
Inserts into expenses table
      ↓
Returns created expense
      ↓
Frontend adds to state
      ↓
UI updates automatically
      ↓
User sees new expense in list
```

## Key Design Decisions (See decisions.md)
1. Single table design (no user table - single user assumption)
2. Category as string (not separate table - simple & scalable)
3. REST API (vs GraphQL - simpler for this scale)
4. React hooks (vs Redux - overkill for this app size)
5. Tailwind CSS (vs custom CSS - faster development)

## Performance Considerations
- Load all expenses on startup (small dataset)
- Category summary calculated in frontend (not DB)
- No pagination (assuming < 1000 expenses)
- No caching (single user, data always fresh)

## Security Considerations
- Validate all inputs on backend
- Use environment variables for DB credentials
- No SQL injection possible (using parameterized queries)
- CORS enabled for localhost only
