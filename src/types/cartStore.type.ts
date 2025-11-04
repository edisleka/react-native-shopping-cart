import { Product, CartItem } from './product.type'

export interface CartStore {
  cart: CartItem[]
  itemCount: number
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  decrementQuantity: (productId: number) => void
  clearCart: () => void
}
