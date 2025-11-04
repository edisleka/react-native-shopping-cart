import { Product } from './product.type'

export interface CartStore {
  cart: Product[]
  itemCount: number
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  decrementQuantity: (productId: number) => void
  clearCart: () => void
}
