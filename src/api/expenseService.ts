import { Expense, CategorySummary, ApiResponse } from '../types/expense';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';

export const expenseService = {
  async getExpenses(): Promise<Expense[]> {
    const response = await fetch(`${API_BASE_URL}/expenses`);
    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }
    const data: ApiResponse<Expense[]> = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Unknown error');
    }
    return data.data || [];
  },

  async addExpense(expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>): Promise<Expense> {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    });

    if (!response.ok) {
      const errorData: ApiResponse<null> = await response.json();
      throw new Error(errorData.error || 'Failed to add expense');
    }

    const data: ApiResponse<Expense> = await response.json();
    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to add expense');
    }
    return data.data;
  },

  async deleteExpense(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData: ApiResponse<null> = await response.json();
      throw new Error(errorData.error || 'Failed to delete expense');
    }
  },

  async getCategorySummary(): Promise<CategorySummary[]> {
    const response = await fetch(`${API_BASE_URL}/expenses/summary/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch category summary');
    }
    const data: ApiResponse<CategorySummary[]> = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Unknown error');
    }
    return data.data || [];
  },
};
