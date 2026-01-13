import { useQuery } from '@tanstack/react-query'
import { fetchPurchaseFrequency } from '../api/purchaseFrequency'
import type { DateRange } from '../types'

export function usePurchaseFrequency(dateRange: DateRange) {
  return useQuery({
    queryKey: ['purchaseFrequency', dateRange],
    queryFn: () => fetchPurchaseFrequency(dateRange.from, dateRange.to),
  })
}
