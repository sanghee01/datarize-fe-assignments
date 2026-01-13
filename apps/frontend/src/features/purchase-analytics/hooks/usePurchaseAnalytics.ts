import { useQuery } from '@tanstack/react-query'
import { getPurchaseFrequency } from '../api/getPurchaseFrequency'
import type { DateRange } from '@/shared/types'

export function usePurchaseAnalytics(dateRange: DateRange) {
  return useQuery({
    queryKey: ['purchaseFrequency', dateRange],
    queryFn: () => getPurchaseFrequency(dateRange.from, dateRange.to),
  })
}
