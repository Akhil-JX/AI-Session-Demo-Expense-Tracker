# Learnings & Patterns

## Development Patterns Discovered

### 1. Form Validation Pattern
**Learning:** Always validate on both frontend and backend  
**Why:** Frontend validation is for UX (fast feedback), backend is for security  
**Pattern:** 
- Frontend: Show error messages immediately
- Backend: Reject invalid data before touching database
**Example:** Amount field must be positive number, description is optional but limited to 500 chars

### 2. API Response Consistency
**Learning:** Always return same structure for success and errors  
**Pattern:**
```javascript
// Success
{ success: true, data: {...}, message: "Expense created" }

// Error
{ success: false, error: "VALIDATION_ERROR", message: "Amount must be positive" }
```
**Benefit:** Frontend can trust response structure always

### 3. Date Handling
**Learning:** Always store dates in UTC, format locally  
**Why:** Prevents timezone bugs when code moves between regions  
**Pattern:** Store `created_at` in UTC, display in user's local timezone

### 4. Empty State UI
**Learning:** Always show helpful message when list is empty  
**Pattern:** "No expenses yet. Add your first expense!" instead of blank screen  
**Benefit:** Users don't wonder if app is broken

### 5. Delete Confirmation
**Learning:** Always ask before destructive actions  
**Pattern:** Show modal dialog: "Are you sure? This cannot be undone."  
**Benefit:** Prevents accidental data loss

---

## Pitfalls to Avoid

### Pitfall 1: Forgetting Database Index on created_at
**Problem:** Sorting by date is slow with 1000+ expenses  
**Solution:** Add index on `created_at` column  
**When discovered:** After app felt slow with test data

### Pitfall 2: Rounding Errors with Decimal Math
**Problem:** `0.1 + 0.2` doesn't equal `0.3` in JavaScript  
**Solution:** Store amounts as integers (cents, not dollars) or use Decimal library  
**Prevention:** Always use decimal type in database, not float

### Pitfall 3: Lost Focus on Add Form After Submit
**Problem:** User adds expense but form doesn't reset, confusing  
**Solution:** Clear form inputs after successful submit  
**Prevention:** Test UX after every action

### Pitfall 4: Missing Error Messages
**Problem:** Request fails silently, user doesn't know what happened  
**Solution:** Always show error toast/alert to user  
**Prevention:** Never fail silently - always communicate to user

### Pitfall 5: Category Spelling Inconsistency
**Problem:** "Food" and "food" treated as different categories  
**Solution:** Store categories in lowercase, display with formatting  
**Prevention:** Use constants for predefined categories

---

## SQL Query Patterns

### Get Total by Category (Don't do this in JavaScript!)
```sql
-- GOOD: Calculate in database
SELECT category, SUM(amount) as total 
FROM expenses 
GROUP BY category 
ORDER BY total DESC;

-- BAD: Calculate in JavaScript (slow with large data)
expenses.reduce((acc, exp) => {...}, {})
```

### Get Recent Expenses First
```sql
-- Use created_at for sorting
SELECT * FROM expenses 
ORDER BY created_at DESC 
LIMIT 50;
```

---

## React Hooks Patterns

### State Updates Pattern
```javascript
// DON'T: Multiple setState calls (batch them)
setExpenses(prev => [...prev, newExpense]);
setLoading(false);
setError(null);

// DO: Use effect to manage related state
const [state, setState] = useState({
  expenses: [],
  loading: false,
  error: null
});
```

### Fetch Data Pattern
```javascript
// GOOD: Clean up on unmount
useEffect(() => {
  const controller = new AbortController();
  
  fetch('/api/expenses', { signal: controller.signal })
    .then(res => res.json())
    .then(data => setExpenses(data));
    
  return () => controller.abort(); // Cancel if unmounting
}, []);
```

---

## Testing Patterns

### What to Test
✅ Form validation (empty amount, negative amount)  
✅ API calls (success and error cases)  
✅ Delete confirmation (user clicks yes/no)  
✅ Category grouping calculation  

### What NOT to Test
❌ Tailwind CSS classes rendering  
❌ Browser's fetch implementation  
❌ React's internal state management  

---

## Performance Lessons

### Lesson 1: Premature Optimization is Evil
**Learning:** Don't optimize before measuring  
**Pattern:** Add feature first, test with real data, then optimize if slow  

### Lesson 2: Avoid Re-rendering All Expenses
**Learning:** When adding one expense, only add it to state, don't refetch all  
**Pattern:**
```javascript
// GOOD
setExpenses(prev => [newExpense, ...prev]);

// BAD (unnecessary network request)
refetchAllExpenses();
```

### Lesson 3: Debounce Search Queries
**Learning:** Don't query on every keystroke  
**Pattern:** Wait 300ms after user stops typing before searching  

---

## Security Learnings

### Input Validation Must Happen Twice
**Frontend:** For user feedback (fast, visible)  
**Backend:** For actual security (cannot be bypassed)  

### Never Trust Client-Side Calculations
**Example:** Don't trust total amount calculated in JavaScript  
**Pattern:** Always recalculate totals in backend before saving  

### SQL Injection Prevention
**Pattern:** Always use parameterized queries
```javascript
// GOOD
db.query('SELECT * FROM expenses WHERE id = $1', [id]);

// BAD (vulnerable)
db.query(`SELECT * FROM expenses WHERE id = ${id}`);
```

---

## Common Mistakes Made

| Mistake | Why It's Bad | How to Fix |
|---------|-------------|-----------|
| Using `any` type in TypeScript | Defeats type safety | Properly type all variables |
| Mutating state directly | React won't detect changes | Always create new objects/arrays |
| Not handling empty lists | Confusing UX | Show helpful "no data" message |
| Forgetting to add DB indexes | Queries become slow | Index columns you sort/filter by |
| No error handling on API | Silent failures | Always show errors to user |

---

## Updated Best Practices (as of Phase 3+)

1. **Always reference context files when prompting AI**
   - Include "per AGENTS.md naming conventions"
   - "Following implementation_plan.md architecture"

2. **Keep commits small and meaningful**
   - One feature slice = one commit
   - Message format: "feat: add expense deletion with confirmation modal"

3. **Test edge cases manually**
   - AI might not consider: empty form, very large numbers, special characters

4. **Code review before shipping**
   - Golden rule: If you can't explain it, don't ship it
