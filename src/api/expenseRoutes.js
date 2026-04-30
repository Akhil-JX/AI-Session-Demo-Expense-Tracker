// BACKEND: Express.js routes for Expense API
// File: backend/routes/expenseRoutes.js

const express = require('express');
const db = require('../db/connection');

const router = express.Router();

// GET all expenses, ordered by most recent first
router.get('/expenses', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM expenses ORDER BY created_at DESC'
    );
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({
      success: false,
      error: 'FETCH_ERROR',
      message: 'Failed to fetch expenses',
    });
  }
});

// POST create new expense with validation
router.post('/expenses', async (req, res) => {
  const { amount, category, description } = req.body;

  // Validate input (backend validation - always do this!)
  if (!amount || amount <= 0) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Amount must be a positive number',
    });
  }

  if (!category || category.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Category is required',
    });
  }

  if (description && description.length > 500) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Description must be less than 500 characters',
    });
  }

  try {
    // Use parameterized query to prevent SQL injection
    const result = await db.query(
      'INSERT INTO expenses (amount, category, description) VALUES ($1, $2, $3) RETURNING *',
      [parseFloat(amount), category.trim(), description || null]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Expense created successfully',
    });
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({
      success: false,
      error: 'CREATE_ERROR',
      message: 'Failed to create expense',
    });
  }
});

// DELETE an expense by ID
router.delete('/expenses/:id', async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Invalid expense ID',
    });
  }

  try {
    const result = await db.query(
      'DELETE FROM expenses WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'NOT_FOUND',
        message: 'Expense not found',
      });
    }

    res.json({
      success: true,
      message: 'Expense deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({
      success: false,
      error: 'DELETE_ERROR',
      message: 'Failed to delete expense',
    });
  }
});

// GET category summary - total spending by category
router.get('/expenses/summary/categories', async (req, res) => {
  try {
    // Calculate summary in database (better than in JavaScript for large datasets)
    const result = await db.query(
      `SELECT
        category,
        SUM(amount)::numeric as total,
        COUNT(*)::integer as count
       FROM expenses
       GROUP BY category
       ORDER BY total DESC`
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error('Error fetching category summary:', error);
    res.status(500).json({
      success: false,
      error: 'FETCH_ERROR',
      message: 'Failed to fetch category summary',
    });
  }
});

module.exports = router;
