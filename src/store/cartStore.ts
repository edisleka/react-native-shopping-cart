import { CartStore } from '@/types/cartStore.type'
import { CartItem, Product } from '@/types/product.type'
import { create } from 'zustand'

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  itemCount: 0,

  addToCart: (product: Product) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === product.id
      )

      if (existingItemIndex !== -1) {
        // Item exists, increment quantity
        const updatedCart = [...state.cart]
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        }

        return {
          cart: updatedCart,
          itemCount: state.itemCount + 1,
        }
      } else {
        // New item, add with quantity 1
        const newItem: CartItem = { ...product, quantity: 1 }
        return {
          cart: [...state.cart, newItem],
          itemCount: state.itemCount + 1,
        }
      }
    }),

  decrementQuantity: (productId: number) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === productId
      )

      if (existingItemIndex === -1) return state

      const existingItem = state.cart[existingItemIndex]

      if (existingItem.quantity > 1) {
        // Decrement quantity
        const updatedCart = [...state.cart]
        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        }

        return {
          cart: updatedCart,
          itemCount: state.itemCount - 1,
        }
      } else {
        // Remove item if quantity is 1
        return {
          cart: state.cart.filter((item) => item.id !== productId),
          itemCount: state.itemCount - 1,
        }
      }
    }),

  removeFromCart: (productId: number) =>
    set((state) => {
      const item = state.cart.find((item) => item.id === productId)
      if (!item) return state

      return {
        cart: state.cart.filter((item) => item.id !== productId),
        itemCount: state.itemCount - item.quantity,
      }
    }),

  clearCart: () =>
    set(() => ({
      cart: [],
      itemCount: 0,
    })),
}))
