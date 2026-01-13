import { useQuery } from '@tanstack/react-query'
import { fetchCustomerPurchases } from '../api/customerPurchases'
import type { DateRange } from '../types'

export function useCustomerPurchases(customerId: number | null, dateRange: DateRange) {
  return useQuery({
    queryKey: ['customerPurchases', customerId, dateRange],
    queryFn: () => fetchCustomerPurchases(customerId!, dateRange.from, dateRange.to),
    enabled: customerId !== null,
  })
}
