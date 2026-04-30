export interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface CategorySummary {
  category: string;
  total: number;
  count: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
