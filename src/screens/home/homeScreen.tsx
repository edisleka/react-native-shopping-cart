import Header from '@/components/Header'
import data from '@/data/dummyData.json'
import { LegendList } from '@legendapp/list'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  return (
    <SafeAreaView className='flex-1 bg-white px-4'>
      <Header />

      <LegendList
        data={data}
        renderItem={({ item }) => (
          <Text className='text-base'>{item.title}</Text>
        )}
        keyExtractor={({ id }) => id.toString()}
        recycleItems
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}
