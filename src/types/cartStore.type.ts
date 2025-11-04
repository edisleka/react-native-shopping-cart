import { Product } from './product.type'

export interface CartStore {
  cart: (Product & { quantity: number })[]
  itemsCount: number
  addToCart: (product: Product) => void
  removeFromCart: (product: Product) => void
  clearCart: () => void
}
