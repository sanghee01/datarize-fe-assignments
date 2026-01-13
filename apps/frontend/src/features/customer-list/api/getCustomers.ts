import { fetchAPI } from '@/shared/api'
import type { GetCustomersParams, GetCustomersResponse } from '../types'

export async function getCustomers(params: GetCustomersParams = {}): Promise<GetCustomersResponse> {
  const searchParams = new URLSearchParams()

  if (params.sortBy) searchParams.append('sortBy', params.sortBy)
  if (params.name) searchParams.append('name', params.name)
  if (params.page) searchParams.append('page', params.page.toString())
  if (params.limit) searchParams.append('limit', params.limit.toString())
  if (params.from) searchParams.append('from', params.from)
  if (params.to) searchParams.append('to', params.to)

  const queryString = searchParams.toString()
  const url = queryString ? `/api/customers?${queryString}` : `/api/customers`

  const data = await fetchAPI<GetCustomersResponse>(url)
  return data
}
