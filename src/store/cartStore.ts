import { CartStore } from '@/types/cartStore.type'
import { Product } from '@/types/product.type'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { zustandStorage } from './mmkv'

const calculateItemsCount = (
  cart: (Product & { quantity: number })[]
): number => cart.reduce((sum, item) => sum + item.quantity, 0)

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      itemsCount: 0,
      addToCart: (product: Product) =>
        set((state) => {
          const existingIndex = state.cart.findIndex((p) => p.id === product.id)
          const updatedCart =
            existingIndex >= 0
              ? state.cart.map((item, index) =>
                  index === existingIndex
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
              : [...state.cart, { ...product, quantity: 1 }]

          return {
            cart: updatedCart,
            itemsCount: calculateItemsCount(updatedCart),
          }
        }),
      removeFromCart: (product: Product) =>
        set((state) => {
          const updatedCart = state.cart
            .map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0)

          return {
            cart: updatedCart,
            itemsCount: calculateItemsCount(updatedCart),
          }
        }),
      clearCart: () =>
        set(() => ({
          cart: [],
          itemsCount: 0,
        })),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
)
