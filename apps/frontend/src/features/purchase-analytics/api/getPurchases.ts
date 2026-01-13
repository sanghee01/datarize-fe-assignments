import { fetchAPI } from '@/shared/api'
import type { Purchase } from '../types'

export async function getPurchases(from?: string, to?: string): Promise<Purchase[]> {
  const params = new URLSearchParams()
  if (from) params.append('from', from)
  if (to) params.append('to', to)

  const queryString = params.toString()
  const url = queryString ? `/api/purchases?${queryString}` : `/api/purchases`

  const data = await fetchAPI<Purchase[]>(url)
  return data
}
