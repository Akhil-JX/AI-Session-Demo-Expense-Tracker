# Expense Tracker - Project Brief

## What We're Building
A simple web application that allows users to track daily expenses, categorize them, and see spending summaries.

## Who Uses It
Individual users who want to keep track of their spending without complex budgeting features.

## Core Features (Must Do)
- Add a new expense with amount, category, and description
- View list of all expenses
- See total spending by category
- Delete an expense
- Simple dashboard showing this month's spending

## What's Out of Scope (Must NOT Do)
- User authentication (single user only)
- Multiple users or accounts
- Budget alerts or notifications
- Recurring expenses
- Receipt uploads or file attachments
- Mobile app (web only)
- Multi-currency support
- Export to CSV or PDF

## Primary User Journey
1. User opens the app
2. User clicks "Add Expense"
3. User fills in amount, category, and description
4. Expense is saved and appears in the list
5. User can see a summary of total spending by category

## Technical Constraints
- Must use React for frontend
- Must have a simple backend API
- Must use PostgreSQL for data storage
- Must be deployable locally with Docker
- Must load in under 2 seconds

## Success Criteria
- User can add and see 5 expenses without page refresh
- Total spending calculates correctly
- Can delete any expense
- App works offline gracefully
- Code is clean and understandable
