import { useCartStore } from '@/store/cartStore'
import { Product } from '@/types/product.type'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Text, TouchableOpacity, View } from 'react-native'
import { Image } from './Image'

export const RenderItem = (item: Product) => {
  const addToCart = useCartStore((state) => state.addToCart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const quantity = useCartStore(
    (state) => state.cart.find((p) => p.id === item.id)?.quantity ?? 0
  )

  return (
    <View className='flex-row gap-2.5 mb-4 bg-white p-2.5 rounded-lg'>
      <Image source={{ uri: item.image }} className='w-24 h-24 ' />
      <View className='gap-2'>
        <Text numberOfLines={1} className='text-base font-bold'>
          {item.title}
        </Text>
        <Text className='text-sm text-gray-500 font-semibold'>
          ${item.price}
        </Text>
        <View className='flex-row gap-2.5 items-center'>
          <TouchableOpacity
            className='bg-gray-200 p-1 rounded-md'
            onPress={() => addToCart(item)}
          >
            <Ionicons name='add-outline' size={24} color='black' />
          </TouchableOpacity>
          <Text className='text-base font-bold'>{quantity}</Text>
          <TouchableOpacity
            className='bg-gray-200 p-1 rounded-md'
            onPress={() => removeFromCart(item)}
          >
            <Ionicons name='remove-outline' size={24} color='black' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
