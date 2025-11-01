import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from 'expo-router/unstable-native-tabs'
import { Platform } from 'react-native'

export default function TabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name='index'>
        <Label>Home</Label>
        {Platform.select({
          ios: <Icon sf={{ default: 'house', selected: 'house.fill' }} />,
          android: (
            <Icon src={<VectorIcon family={FontAwesome5} name='home' />} />
          ),
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='cart'>
        <Label>Cart</Label>

        {Platform.select({
          ios: <Icon sf={{ default: 'cart', selected: 'cart.fill' }} />,
          android: (
            <Icon src={<VectorIcon family={Entypo} name='shopping-cart' />} />
          ),
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
