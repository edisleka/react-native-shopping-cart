import { useCartStore } from '@/store/cartStore'
import { Product } from '@/types/product.type'
import { Image } from '@components/Image'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as Haptics from 'expo-haptics'
import React, { useCallback, useMemo, useState } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

interface ProductCardProps {
  item: Product
  onPress?: (product: Product) => void
}

export const ProductCard = React.memo(({ item, onPress }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const { addToCart, decrementQuantity, cart } = useCartStore()

  // Calculate discounted price
  const hasDiscount = useMemo(
    () => typeof item.discount === 'number' && item.discount > 0,
    [item.discount]
  )

  const discountedPrice = useMemo(() => {
    if (!hasDiscount) return item.price
    return item.price * (1 - item.discount! / 100)
  }, [item.price, item.discount, hasDiscount])

  // Check if item is in cart
  const cartItem = useMemo(
    () => cart.find((cartItem) => cartItem.id === item.id),
    [cart, item.id]
  )

  const quantity = cartItem?.quantity || 0

  // Haptic feedback helper
  const triggerHaptic = useCallback(() => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
  }, [])

  // Handlers
  const handleFavoriteToggle = useCallback(() => {
    triggerHaptic()
    setIsFavorite((prev) => !prev)
  }, [triggerHaptic])

  const handleAddToCart = useCallback(() => {
    triggerHaptic()
    addToCart(item)
  }, [item, addToCart, triggerHaptic])

  const handleRemoveFromCart = useCallback(() => {
    if (quantity > 0) {
      triggerHaptic()
      decrementQuantity(item.id)
    }
  }, [quantity, triggerHaptic, decrementQuantity, item.id])

  const handleCardPress = useCallback(() => {
    onPress?.(item)
  }, [item, onPress])

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={handleCardPress}
      className='mb-6 rounded-3xl bg-white p-4'
      style={styles.cardContainer}
      accessible={true}
      accessibilityRole='button'
      accessibilityLabel={`${item.title}, ${item.brand}, ${discountedPrice.toFixed(2)} dollars`}
      accessibilityHint='Double tap to view product details'
    >
      {/* Product Image Container */}
      <View className='relative overflow-hidden rounded-2xl bg-slate-50'>
        <Image
          source={{ uri: item.image }}
          className='h-48 w-full'
          contentFit='contain'
          accessibilityLabel={`${item.title} product image`}
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <View
            className='absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1.5'
            style={styles.badge}
            accessible={true}
            accessibilityLabel={`${item.discount} percent discount`}
          >
            <Text className='text-xs font-bold text-white'>
              -{item.discount}% OFF
            </Text>
          </View>
        )}

        {/* Favorite Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleFavoriteToggle}
          className='absolute right-3 top-3 rounded-xl bg-white/95 p-2.5'
          style={[styles.iconButton, isFavorite && styles.favoriteActive]}
          accessible={true}
          accessibilityRole='button'
          accessibilityLabel={
            isFavorite ? 'Remove from favorites' : 'Add to favorites'
          }
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavorite ? '#f97316' : '#0f172a'}
          />
        </TouchableOpacity>

        {/* In Cart Indicator */}
        {quantity > 0 && (
          <View
            className='absolute bottom-3 right-3 rounded-full bg-green-500 px-3 py-1'
            style={styles.badge}
            accessible={true}
            accessibilityLabel={`${quantity} in cart`}
          >
            <Text className='text-xs font-bold text-white'>
              {quantity} in cart
            </Text>
          </View>
        )}
      </View>

      {/* Product Information */}
      <View className='mt-4 gap-2'>
        {/* Brand and Popular Badge */}
        <View className='flex-row items-center justify-between'>
          <Text
            className='text-xs font-bold uppercase tracking-wider text-gray-400'
            numberOfLines={1}
            style={{ flex: 1 }}
          >
            {item.brand}
          </Text>

          {item.popular && (
            <View
              className='flex-row items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1'
              accessible={true}
              accessibilityLabel='Popular item'
            >
              <Ionicons name='flame' size={14} color='#f97316' />
              <Text className='text-xs font-bold text-orange-600'>Popular</Text>
            </View>
          )}
        </View>

        {/* Product Title */}
        <Text
          numberOfLines={2}
          className='text-lg font-bold leading-snug text-gray-900'
          accessible={true}
        >
          {item.title}
        </Text>

        {/* Product Description */}
        <Text
          numberOfLines={2}
          className='text-sm leading-5 text-gray-500'
          accessible={true}
        >
          {item.description}
        </Text>

        {/* Price and Actions */}
        <View className='mt-3 flex-row items-center justify-between'>
          {/* Price Container */}
          <View className='gap-1'>
            {hasDiscount && (
              <Text
                className='text-xs font-medium text-gray-400 line-through'
                accessible={true}
                accessibilityLabel={`Original price ${item.price.toFixed(2)} dollars`}
              >
                ${item.price.toFixed(2)}
              </Text>
            )}
            <View className='rounded-xl bg-gray-900 px-4 py-2.5'>
              <Text
                className='text-lg font-bold text-white'
                accessible={true}
                accessibilityLabel={`Current price ${discountedPrice.toFixed(2)} dollars`}
              >
                ${discountedPrice.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className='flex-row items-center gap-2'>
            {/* Remove Button - Only show if item is in cart */}
            {quantity > 0 && (
              <TouchableOpacity
                onPress={handleRemoveFromCart}
                className='h-12 w-12 items-center justify-center rounded-xl bg-gray-100'
                style={styles.actionButton}
                accessible={true}
                accessibilityRole='button'
                accessibilityLabel='Remove one from cart'
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name='remove' size={24} color='#0f172a' />
              </TouchableOpacity>
            )}

            {/* Add to Cart Button */}
            <TouchableOpacity
              onPress={handleAddToCart}
              className='h-12 w-12 items-center justify-center rounded-xl bg-orange-500'
              style={styles.primaryAction}
              accessible={true}
              accessibilityRole='button'
              accessibilityLabel='Add to cart'
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name='add' size={24} color='#ffffff' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
})

ProductCard.displayName = 'ProductCard'

// Render function for FlatList
export const renderItem = ({ item }: { item: Product }) => (
  <ProductCard item={item} />
)

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  iconButton: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  favoriteActive: {
    backgroundColor: '#fff5f0',
    shadowColor: '#f97316',
    shadowOpacity: 0.2,
  },
  badge: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButton: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  primaryAction: {
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
})
