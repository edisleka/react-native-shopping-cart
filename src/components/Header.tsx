import { Text, View } from 'react-native'

export default function Header() {
  return (
    <View className='flex-row items-center justify-between'>
      <View className=''>
        <Text className='text-lg font-bold text-black'>Logo</Text>
      </View>
      <View className=''>
        <Text className='text-lg font-bold text-black'>Cart</Text>
      </View>
    </View>
  )
}
