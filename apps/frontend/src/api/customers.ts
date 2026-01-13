import { fetchAPI } from './client'
import type { CustomersResponse } from '../types'

interface FetchCustomersParams {
  sortBy?: 'asc' | 'desc'
  name?: string
  page?: number
  limit?: number
  from?: string
  to?: string
}

export async function fetchCustomers(params: FetchCustomersParams = {}): Promise<CustomersResponse> {
  const searchParams = new URLSearchParams()

  if (params.sortBy) searchParams.append('sortBy', params.sortBy)
  if (params.name) searchParams.append('name', params.name)
  if (params.page) searchParams.append('page', params.page.toString())
  if (params.limit) searchParams.append('limit', params.limit.toString())
  if (params.from) searchParams.append('from', params.from)
  if (params.to) searchParams.append('to', params.to)

  const queryString = searchParams.toString()
  const url = queryString ? `/api/customers?${queryString}` : `/api/customers`

  const data = await fetchAPI<CustomersResponse>(url)
  return data
}
