import express from 'express';
import db from '../db/connection.js';

const router = express.Router();

// GET all expenses
router.get('/', (req, res, next) => {
  try {
    const stmt = db.prepare('SELECT * FROM expenses ORDER BY created_at DESC');
    const expenses = stmt.all();
    res.json({
      success: true,
      data: expenses,
      count: expenses.length,
    });
  } catch (error) {
    next(error);
  }
});

// POST new expense (Phase 4: Frontend AND backend validation)
router.post('/', (req, res, next) => {
  try {
    const { amount, category, description } = req.body;

    // Backend validation (critical for security)
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be a positive number',
      });
    }

    if (!category || typeof category !== 'string' || category.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Category is required',
      });
    }

    if (amount > 999999.99) {
      return res.status(400).json({
        success: false,
        error: 'Amount cannot exceed 999,999.99',
      });
    }

    // Use parameterized query to prevent SQL injection (Phase 4 security)
    const stmt = db.prepare(
      'INSERT INTO expenses (amount, category, description) VALUES (?, ?, ?)'
    );
    const info = stmt.run(amount, category, description || null);

    // Fetch the inserted row
    const newExpense = db.prepare('SELECT * FROM expenses WHERE id = ?').get(info.lastInsertRowid);

    res.status(201).json({
      success: true,
      data: newExpense,
      message: 'Expense added successfully',
    });
  } catch (error) {
    next(error);
  }
});

// DELETE expense
router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ID is a number
    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({
        success: false,
        error: 'Invalid expense ID',
      });
    }

    // Get the expense before deleting (for response)
    const expense = db.prepare('SELECT * FROM expenses WHERE id = ?').get(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found',
      });
    }

    // Delete the expense
    db.prepare('DELETE FROM expenses WHERE id = ?').run(id);

    res.json({
      success: true,
      data: expense,
      message: 'Expense deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

// GET summary by category
router.get('/summary/by-category', (req, res, next) => {
  try {
    const stmt = db.prepare(`
      SELECT
        category,
        COUNT(*) as count,
        ROUND(SUM(amount), 2) as total
      FROM expenses
      GROUP BY category
      ORDER BY total DESC
    `);
    const summary = stmt.all();

    res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
