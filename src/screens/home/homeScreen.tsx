import { Image } from '@/components/Image'
import { Product } from '@/types/product.type'
import Header from '@components/Header'
import data from '@data/dummyData.json'
import Ionicons from '@expo/vector-icons/Ionicons'
import { LegendList } from '@legendapp/list'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  const renderItem = ({ item }: { item: Product }) => (
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
          <TouchableOpacity className='bg-gray-200 p-1 rounded-md'>
            <Ionicons name='add-outline' size={24} color='black' />
          </TouchableOpacity>
          <TouchableOpacity className='bg-gray-200 p-1 rounded-md'>
            <Ionicons name='remove-outline' size={24} color='black' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView className='flex-1 px-4'>
      <Header />

      <LegendList
        data={data}
        renderItem={renderItem}
        keyExtractor={({ id }) => id.toString()}
        recycleItems
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      />
    </SafeAreaView>
  )
}
