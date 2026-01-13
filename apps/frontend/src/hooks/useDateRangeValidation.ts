import { useState } from 'react'
import type { DateRange } from '../types'

interface ValidationState {
  error: string | null
  touched: {
    from: boolean
    to: boolean
  }
}

export function useDateRangeValidation() {
  const [state, setState] = useState<ValidationState>({
    error: null,
    touched: { from: false, to: false },
  })

  const validateDates = (from: string, to: string): string | null => {
    if (!from || !to) {
      return null
    }

    const fromDate = new Date(from)
    const toDate = new Date(to)

    if (fromDate > toDate) {
      return '시작일은 종료일보다 이전이어야 합니다.'
    }

    return null
  }

  const handleFromChange = (dateRange: DateRange) => {
    setState((prev) => ({
      ...prev,
      touched: { ...prev.touched, from: true },
      error: validateDates(dateRange.from, dateRange.to),
    }))
  }

  const handleToChange = (dateRange: DateRange) => {
    setState((prev) => ({
      ...prev,
      touched: { ...prev.touched, to: true },
      error: validateDates(dateRange.from, dateRange.to),
    }))
  }

  return {
    error: state.error,
    touched: state.touched,
    handleFromChange,
    handleToChange,
  }
}
