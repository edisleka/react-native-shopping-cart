import Header from '@components/Header'
import data from '@data/dummyData.json'
import { LegendList } from '@legendapp/list'
import { SafeAreaView } from 'react-native-safe-area-context'
import { renderItem } from './productListItemRenderer'

export default function HomeScreen() {
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
