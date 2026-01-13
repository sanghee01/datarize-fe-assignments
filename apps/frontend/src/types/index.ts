export interface DateRange {
  from: string
  to: string
}

export interface PurchaseFrequency {
  range: string
  count: number
}

export interface Purchase {
  date: string
  customerName: string
  productName: string
  price: number
  quantity: number
}

export interface Customer {
  id: number
  name: string
  count: number
  totalAmount: number
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface CustomersResponse {
  data: Customer[]
  pagination: Pagination
}

export interface CustomerPurchase {
  date: string
  quantity: number
  product: string
  price: number
  imgSrc: string
}
