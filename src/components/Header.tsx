import { useCartStore } from '@/store/cartStore'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Text, View } from 'react-native'

export default function Header() {
  const itemsCount = useCartStore((state) => state.itemsCount)

  return (
    <View className='flex-row items-center justify-between mb-6'>
      <View>
        <Text className='text-2xl font-bold text-indigo-600'>Logo</Text>
      </View>
      <View className='flex-row items-center gap-2'>
        <View className='bg-indigo-600 px-3 py-1.5 rounded-full flex-row items-center gap-2 shadow-md'>
          <Ionicons name='cart-outline' size={18} color='white' />
          <Text className='text-base font-bold text-white'>{itemsCount}</Text>
        </View>
      </View>
    </View>
  )
}
