import type { Pagination } from './common'

export interface Customer {
  id: number
  name: string
  count: number
  totalAmount: number
}

export interface CustomersResponse {
  data: Customer[]
  pagination: Pagination
}
