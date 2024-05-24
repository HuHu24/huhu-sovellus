export interface CafeProduct {
  product: string
  price: string
  hasSale: boolean
  saleText: string
}

export default interface CafePrices {
  iceCream: CafeProduct[]
  salty: CafeProduct[]
  grill: CafeProduct[]
  pastry: CafeProduct[]
  drink: CafeProduct[]
  sweet: CafeProduct[]
}
