import { RenderItem } from '@/components/RenderItem'
import { useCartStore } from '@/store/cartStore'
import Header from '@components/Header'
import { LegendList } from '@legendapp/list'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function CartScreen() {
  const cart = useCartStore((state) => state.cart)

  return (
    <SafeAreaView className='flex-1 px-4'>
      <Header />

      <LegendList
        data={cart}
        renderItem={({ item }) => <RenderItem {...item} />}
        keyExtractor={({ id }) => id.toString()}
        recycleItems
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      />
    </SafeAreaView>
  )
}
