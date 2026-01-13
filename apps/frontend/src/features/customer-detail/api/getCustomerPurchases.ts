import { fetchAPI } from '@/shared/api'
import type { CustomerPurchase } from '../types'

export async function getCustomerPurchases(
  customerId: number,
  from?: string,
  to?: string,
): Promise<CustomerPurchase[]> {
  const params = new URLSearchParams()
  if (from) params.append('from', from)
  if (to) params.append('to', to)

  const queryString = params.toString()
  const url = queryString
    ? `/api/customers/${customerId}/purchases?${queryString}`
    : `/api/customers/${customerId}/purchases`

  const data = await fetchAPI<CustomerPurchase[]>(url)
  return data
}
