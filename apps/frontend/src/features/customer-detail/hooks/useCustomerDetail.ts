import { useQuery } from '@tanstack/react-query'
import { getCustomerPurchases } from '../api/getCustomerPurchases'
import type { DateRange } from '@/shared/types'

export function useCustomerDetail(customerId: number | null, dateRange: DateRange) {
  return useQuery({
    queryKey: ['customerPurchases', customerId, dateRange],
    queryFn: () => getCustomerPurchases(customerId!, dateRange.from, dateRange.to),
    enabled: customerId !== null,
  })
}
