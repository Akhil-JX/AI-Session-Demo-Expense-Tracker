import React, { useState } from 'react'
import { Expense } from '../types/expense'

interface ExpenseFormProps {
  apiUrl: string
  onAddExpense: (expense: Expense) => void
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ apiUrl, onAddExpense }) => {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other']

  // Frontend validation (Phase 3)
  const validateForm = (): boolean => {
    if (!amount) {
      setError('Amount is required')
      return false
    }

    const parsedAmount = parseFloat(amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Amount must be a positive number')
      return false
    }

    if (!category || category.trim() === '') {
      setError('Category is required')
      return false
    }

    if (description.length > 500) {
      setError('Description must be less than 500 characters')
      return false
    }

    setError(null)
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setSuccess(false)

    try {
      const response = await fetch(`${apiUrl}/api/v1/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          category,
          description: description || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to add expense')
      }

      const data = await response.json()
      onAddExpense(data.data)

      // Clear form
      setAmount('')
      setCategory('Food')
      setDescription('')
      setSuccess(true)

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add expense')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
          ✅ Expense added successfully!
        </div>
      )}

      {/* Amount Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount ($)
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          max="999999.99"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-sail-iterate"
          disabled={loading}
          required
        />
      </div>

      {/* Category Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-sail-iterate"
          disabled={loading}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Description Textarea */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about this expense..."
          maxLength={500}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-sail-iterate resize-none"
          disabled={loading}
          rows={3}
        />
        <div className="text-xs text-gray-500 mt-1">
          {description.length}/500 characters
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-sail-iterate text-white font-medium py-2 rounded hover:bg-orange-700 disabled:bg-gray-400 transition text-sm"
      >
        {loading ? 'Adding Expense...' : 'Add Expense'}
      </button>
    </form>
  )
}

export default ExpenseForm
