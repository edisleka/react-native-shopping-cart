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
    <View className='flex-row gap-4 mb-4 bg-white p-4 rounded-xl shadow-md border border-gray-100'>
      <View className='overflow-hidden rounded-xl bg-gray-50'>
        <Image
          source={{ uri: item.image }}
          className='w-28 h-28 object-cover'
        />
      </View>
      <View className='flex-1 gap-3 justify-between'>
        <View className='gap-1'>
          <Text
            numberOfLines={2}
            className='text-base font-bold text-gray-900 leading-5'
          >
            {item.title}
          </Text>
          <Text className='text-lg font-bold text-blue-600'>${item.price}</Text>
        </View>
        <View className='flex-row gap-3 items-center'>
          <TouchableOpacity
            className='bg-blue-500 p-2 rounded-lg shadow-sm active:bg-blue-600'
            onPress={() => addToCart(item)}
            activeOpacity={0.7}
          >
            <Ionicons name='add-outline' size={20} color='white' />
          </TouchableOpacity>
          <View className='bg-gray-100 px-4 py-1.5 rounded-lg min-w-[40px] items-center'>
            <Text className='text-base font-bold text-gray-900'>
              {quantity}
            </Text>
          </View>
          <TouchableOpacity
            className='bg-gray-300 p-2 rounded-lg shadow-sm active:bg-gray-400'
            onPress={() => removeFromCart(item)}
            activeOpacity={0.7}
          >
            <Ionicons name='remove-outline' size={20} color='white' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
