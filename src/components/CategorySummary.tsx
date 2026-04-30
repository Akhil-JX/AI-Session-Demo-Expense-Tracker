import React from 'react'
import { Expense } from '../types/expense'

interface CategorySummaryProps {
  expenses: Expense[]
}

const CategorySummary: React.FC<CategorySummaryProps> = ({ expenses }) => {
  // Group expenses by category and calculate totals
  const summary = expenses.reduce(
    (acc, expense) => {
      const category = expense.category
      if (!acc[category]) {
        acc[category] = { total: 0, count: 0 }
      }
      acc[category].total += parseFloat(expense.amount.toString())
      acc[category].count += 1
      return acc
    },
    {} as Record<string, { total: number; count: number }>
  )

  const categories = Object.entries(summary)
    .sort(([, a], [, b]) => b.total - a.total)

  if (categories.length === 0) {
    return (
      <p className="text-gray-600 text-center py-8">
        No expenses yet to summarize.
      </p>
    )
  }

  const maxTotal = Math.max(...categories.map(([, data]) => data.total))

  const getCategoryColor = (category: string) => {
    const colors: Record<string, { bg: string; bar: string; text: string }> = {
      Food: {
        bg: 'bg-red-50',
        bar: 'bg-red-500',
        text: 'text-red-600',
      },
      Transport: {
        bg: 'bg-blue-50',
        bar: 'bg-blue-500',
        text: 'text-blue-600',
      },
      Entertainment: {
        bg: 'bg-purple-50',
        bar: 'bg-purple-500',
        text: 'text-purple-600',
      },
      Utilities: {
        bg: 'bg-yellow-50',
        bar: 'bg-yellow-500',
        text: 'text-yellow-600',
      },
      Other: {
        bg: 'bg-gray-50',
        bar: 'bg-gray-500',
        text: 'text-gray-600',
      },
    }
    return colors[category] || colors['Other']
  }

  return (
    <div className="space-y-4">
      {categories.map(([category, data]) => {
        const colors = getCategoryColor(category)
        const percentage = (data.total / maxTotal) * 100

        return (
          <div key={category} className={`p-4 rounded ${colors.bg}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`font-medium ${colors.text}`}>{category}</span>
              <span className="text-sm text-gray-600">
                {data.count} {data.count === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full ${colors.bar}`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-lg font-bold ${colors.text}`}>
                ${data.total.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500">
                {percentage.toFixed(1)}% of total
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CategorySummary
