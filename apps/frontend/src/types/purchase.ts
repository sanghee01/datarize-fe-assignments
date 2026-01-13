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

export interface CustomerPurchase {
  date: string
  quantity: number
  product: string
  price: number
  imgSrc: string
}
