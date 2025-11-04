# Shopping Cart App 🛒

A modern React Native shopping cart application built with Expo, featuring a clean UI, persistent cart storage, and smooth user experience.

## Features

- 🛍️ Product browsing with image display
- ➕ Add/remove items from cart
- 📊 Real-time quantity tracking
- 💾 Persistent cart storage (cart persists across app restarts)
- 📱 Cross-platform support (iOS, Android, Web)
- 🎨 Modern UI with TailwindCSS styling
- ⚡ High-performance list rendering with virtualization

## Tech Stack

### Core Framework

- **[Expo](https://expo.dev)** (~54.0.20) - React Native framework and toolchain
- **[React Native](https://reactnative.dev)** (0.81.5) - Mobile app framework
- **[React](https://react.dev)** (19.1.0) - UI library
- **[TypeScript](https://www.typescriptlang.org)** (~5.9.2) - Type safety

### State Management

- **[Zustand](https://zustand-demo.pmnd.rs)** (^5.0.8) - Lightweight state management
  - Persistent storage with MMKV integration
  - Cart state management

### Storage

- **[React Native MMKV](https://github.com/mrousavy/react-native-mmkv)** (^4.0.0) - Fast key-value storage
  - Persistent cart data storage

### Routing & Navigation

- **[Expo Router](https://docs.expo.dev/router/introduction)** (~6.0.13) - File-based routing
- **[React Navigation](https://reactnavigation.org)** - Navigation library
  - `@react-navigation/native` (^7.1.8)
  - `@react-navigation/bottom-tabs` (^7.4.0)
  - `@react-navigation/elements` (^2.6.3)

### UI & Styling

- **[NativeWind](https://www.nativewind.dev)** (^4.2.1) - TailwindCSS for React Native
- **[TailwindCSS](https://tailwindcss.com)** (^3.4.17) - Utility-first CSS framework
- **[Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)** (~5.6.0) - Safe area handling

### Lists & Performance

- **[@legendapp/list](https://github.com/LegendApp/legend-state/tree/main/packages/list)** (^2.0.14) - High-performance virtualized list component

### Icons & Images

- **[@expo/vector-icons](https://docs.expo.dev/guides/icons/)** (^15.0.3) - Icon library (Ionicons)
- **[Expo Image](https://docs.expo.dev/versions/latest/sdk/image/)** (~3.0.10) - Optimized image component

### Animations & Gestures

- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)** (~4.1.1) - Animation library
- **[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)** (~2.28.0) - Gesture system
- **[React Native Worklets](https://github.com/margelo/react-native-worklets-core)** (0.5.1) - Background thread execution

### Expo Modules

- **expo-constants** (~18.0.10) - System constants
- **expo-dev-client** (~6.0.16) - Development build support
- **expo-font** (~14.0.9) - Font loading
- **expo-haptics** (~15.0.7) - Haptic feedback
- **expo-linking** (~8.0.8) - Deep linking
- **expo-splash-screen** (~31.0.10) - Splash screen management
- **expo-status-bar** (~3.0.8) - Status bar control
- **expo-symbols** (~1.0.7) - SF Symbols support
- **expo-system-ui** (~6.0.8) - System UI controls
- **expo-web-browser** (~15.0.8) - In-app browser

### Build Tools & Development

- **[Metro Bundler](https://metrobundler.dev)** - JavaScript bundler
- **[Babel](https://babeljs.io)** - JavaScript compiler
  - `babel-preset-expo` - Expo preset
  - NativeWind Babel plugin
- **[ESLint](https://eslint.org)** (^9.25.0) - Code linting
  - `eslint-config-expo` (~10.0.0) - Expo ESLint config
- **[Prettier Plugin TailwindCSS](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)** (^0.5.11) - Code formatting

### Platform Support

- **react-native-screens** (~4.16.0) - Native screen components
- **react-native-web** (~0.21.0) - Web platform support
- **react-native-nitro-modules** (^0.31.4) - Native modules

## Project Structure

```
shopping-cart/
├── src/
│   ├── app/                 # Expo Router pages
│   │   ├── (tabs)/          # Tab navigation
│   │   └── _layout.tsx      # Root layout
│   ├── components/         # Reusable components
│   │   ├── Header.tsx
│   │   ├── Image.tsx
│   │   └── RenderItem.tsx
│   ├── screens/            # Screen components
│   │   ├── cart/
│   │   └── home/
│   ├── store/              # State management
│   │   ├── cartStore.ts    # Zustand cart store
│   │   └── mmkv.ts         # MMKV storage adapter
│   ├── types/              # TypeScript types
│   │   ├── cartStore.type.ts
│   │   └── product.type.ts
│   └── data/               # Static data
│       └── dummyData.json
├── assets/                 # Images and assets
├── android/                # Android native code
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (optional, can use npx)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd shopping-cart
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Running the App

The app can be run on multiple platforms:

#### Development Build

```bash
npm start
```

Then choose:

- **iOS Simulator**: Press `i` or scan QR code with Expo Go
- **Android Emulator**: Press `a` or scan QR code with Expo Go
- **Web**: Press `w` or visit `http://localhost:8081`

#### Platform-Specific Commands

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

### Building for Production

#### Prebuild (Generate Native Folders)

```bash
npm run prebuild
```

#### Android

```bash
cd android
./gradlew assembleRelease
```

#### iOS

Build through Xcode after running `prebuild`

## Available Scripts

- `npm start` - Start Expo development server with cache cleared
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint
- `npm run prebuild` - Generate native iOS/Android folders

## Key Features Implementation

### Cart Management

- Add products to cart with quantity tracking
- Remove products or decrease quantity
- Persistent storage using MMKV (survives app restarts)
- Real-time quantity display on product items

### State Management

- Zustand store for cart state
- Persistent middleware for data persistence
- Reactive updates across components

### Performance Optimizations

- Virtualized list rendering with `@legendapp/list`
- Optimized image loading with `expo-image`
- Efficient re-renders with Zustand selectors

## Development Notes

- Uses Expo Router for file-based routing
- TypeScript with strict mode enabled
- Path aliases configured for cleaner imports (`@/`, `@components/`, etc.)
- React Compiler enabled (experimental)
- Typed routes enabled (experimental)

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)

## License

Private project
