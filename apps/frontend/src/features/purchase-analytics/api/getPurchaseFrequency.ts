import { fetchAPI } from '@/shared/api'
import type { PurchaseFrequency } from '../types'

export async function getPurchaseFrequency(from?: string, to?: string): Promise<PurchaseFrequency[]> {
  const params = new URLSearchParams()
  if (from) params.append('from', from)
  if (to) params.append('to', to)

  const query = params.toString() ? `?${params.toString()}` : ''
  const url = `/api/purchase-frequency${query}`

  const data = await fetchAPI<PurchaseFrequency[]>(url)
  return data
}
