import { CartStore } from '@/types/cartStore.type'
import { Product } from '@/types/product.type'
import { create } from 'zustand'

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  itemsCount: 0,
  addToCart: (product: Product) =>
    set((state) => {
      const existingProduct = state.cart.find((p) => p.id === product.id)

      if (existingProduct) {
        const updatedCart = state.cart.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            }
          }
          return item
        })
        return {
          cart: updatedCart,
          itemsCount: state.itemsCount + 1,
        }
      } else {
        return {
          cart: [...state.cart, { ...product, quantity: 1 }],
          itemsCount: state.itemsCount + 1,
        }
      }
    }),
  removeFromCart: (product) => {
    set((state) => {
      const updatedCart = state.cart
        .map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            }
          }
          return item
        })
        .filter((item) => item.quantity > 0)

      const decremented = state.cart.some((i) => i.id === product.id)
        ? Math.max(0, state.itemsCount - 1)
        : state.itemsCount

      return {
        cart: updatedCart,
        itemsCount: decremented,
      }
    })
  },
  clearCart: () => {
    set(() => {
      return {
        cart: [],
        itemsCount: 0,
      }
    })
  },
}))
