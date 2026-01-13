import type { Customer } from './customer'
import type { Pagination } from '@/shared/types'

export interface GetCustomersParams {
  sortBy?: 'asc' | 'desc'
  name?: string
  page?: number
  limit?: number
  from?: string
  to?: string
}

export interface GetCustomersResponse {
  data: Customer[]
  pagination: Pagination
}
