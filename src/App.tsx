import React, { useState, useEffect } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpensesList from './components/ExpensesList'
import CategorySummary from './components/CategorySummary'
import { Expense } from './types/expense'

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  // Load expenses on mount
  useEffect(() => {
    loadExpenses()
  }, [])

  const loadExpenses = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${apiUrl}/api/v1/expenses`)

      if (!response.ok) {
        throw new Error('Failed to load expenses')
      }

      const data = await response.json()
      setExpenses(data.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error loading expenses:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddExpense = (newExpense: Expense) => {
    setExpenses([newExpense, ...expenses])
  }

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  const totalAmount = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount.toString()), 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading expenses...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                💰 Expense Tracker
              </h1>
              <p className="text-gray-600 mt-2">
                Built with SAIL Framework - Phase 3 & 4 in action
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-3xl font-bold text-sail-iterate">
                ${totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">⚠️ {error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Add Expense
              </h2>
              <ExpenseForm
                apiUrl={apiUrl}
                onAddExpense={handleAddExpense}
              />
            </div>
          </div>

          {/* Expenses & Summary Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Category Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Summary by Category
              </h2>
              <CategorySummary expenses={expenses} />
            </div>

            {/* Expenses List */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Recent Expenses ({expenses.length})
              </h2>
              {expenses.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  No expenses yet. Add one to get started! 👆
                </p>
              ) : (
                <ExpensesList
                  expenses={expenses}
                  apiUrl={apiUrl}
                  onDeleteExpense={handleDeleteExpense}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-center text-gray-400">
            Built with <span className="text-sail-scope">React</span> +
            <span className="text-sail-architect"> Node.js</span> +
            <span className="text-sail-iterate"> PostgreSQL</span> +
            <span className="text-sail-look"> SAIL Framework</span>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
