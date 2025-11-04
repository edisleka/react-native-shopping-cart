import { Image as ExpoImage, type ImageProps } from 'expo-image'
import { cssInterop } from 'nativewind'

function ImageImpl(props: ImageProps) {
  return <ExpoImage {...props} />
}

export const Image = cssInterop(ImageImpl, {
  className: 'style',
})
