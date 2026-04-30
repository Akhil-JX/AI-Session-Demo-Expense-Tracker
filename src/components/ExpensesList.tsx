import React, { useState } from 'react'
import { Expense } from '../types/expense'

interface ExpensesListProps {
  expenses: Expense[]
  apiUrl: string
  onDeleteExpense: (id: number) => void
}

const ExpensesList: React.FC<ExpensesListProps> = ({
  expenses,
  apiUrl,
  onDeleteExpense,
}) => {
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this expense?')) {
      return
    }

    setDeletingId(id)
    setDeleteError(null)

    try {
      const response = await fetch(`${apiUrl}/api/v1/expenses/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete expense')
      }

      onDeleteExpense(id)
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Food: 'bg-red-100 text-red-800',
      Transport: 'bg-blue-100 text-blue-800',
      Entertainment: 'bg-purple-100 text-purple-800',
      Utilities: 'bg-yellow-100 text-yellow-800',
      Other: 'bg-gray-100 text-gray-800',
    }
    return colors[category] || colors['Other']
  }

  return (
    <div>
      {deleteError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          ⚠️ {deleteError}
        </div>
      )}

      <div className="space-y-2">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 text-xs font-medium rounded ${getCategoryColor(expense.category)}`}>
                  {expense.category}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {expense.description || 'No description'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(expense.created_at)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <p className="font-bold text-gray-900 min-w-20 text-right">
                ${parseFloat(expense.amount.toString()).toFixed(2)}
              </p>
              <button
                onClick={() => handleDelete(expense.id)}
                disabled={deletingId === expense.id}
                className="px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded disabled:text-gray-400 transition"
              >
                {deletingId === expense.id ? '...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExpensesList
