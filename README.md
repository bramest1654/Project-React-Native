# Anterin Venture Prototype

Prototype aplikasi React Native untuk Anterin Premium Transport Service.

## Environment Setup

Sesuai [dokumentasi React Native](https://reactnative.dev/docs/environment-setup), project baru disarankan memakai framework **Expo**. Project ini dibuat dengan:

```bash
npx create-expo-app@latest
```

Yang perlu disiapkan:

- **Node.js** versi LTS dan code editor (VS Code / sejenisnya).
- Salah satu tempat menjalankan aplikasi: HP dengan aplikasi **Expo Go**, **Android Emulator** (Android Studio), atau **iOS Simulator** (Xcode, khusus macOS).

## Panduan Instalasi & Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Jalankan Metro Bundler (scan QR dengan Expo Go)
npx expo start

# 3. Jalankan di iOS Simulator
npx expo start --ios

# 4. Jalankan di Android Emulator
npx expo start --android

# 5. Jalankan test
npm test
```

> Pemetaan lengkap setiap sub-topik materi Binus Maya ke kode ada di [`docs/materi-had.md`](docs/materi-had.md).

## Mapping Fitur Terhadap Sesi React Native (1-13)

Project ini dirancang sebagai prototype venture creation sekaligus implementasi materi React Native:

1. **Sesi 1-2 (Intro to React & React Native, Fundamental React Native: Expo, Components, JSX, Props, State, Core Components)**
   - Environment setup & create project: bagian *Environment Setup* di atas.
   - Implementasi pada: `BrandHeader.jsx`, `PackageCard.jsx`, `PriceSummary.jsx`.
   - Data flow dari `AppNavigator` Context ke halaman-halaman.
   - Penjelasan React API, arsitektur, dan workflow React Native ada di [`docs/materi-had.md`](docs/materi-had.md).

2. **Sesi 3 (Collecting Data: TextInput, Picker, Switch, DateTimePicker, Validasi)**
   - Implementasi pada: `LoginScreen.jsx` + `Input.jsx` (TextInput, `secureTextEntry`), `BookingScreen.jsx` (form pemesanan lengkap: TextInput, Picker, DateTimePicker), `SettingsScreen.jsx` (Switch).
   - Utility validasi ada di `src/utils/validation.js`.

3. **Sesi 4 (Layout and Navigation: Flexbox, Flex Direction, Flex, React Navigation)**
   - Implementasi pada: `AppNavigator.jsx` (Stack + Tab Navigator, `initialRouteName`) dan flex layout di seluruh halaman.
   - `navigation.replace` (Login → MainTabs), `navigation.reset` (logout ke Login), dan nested navigation `navigate("MainTabs", { screen })` di `BrandHeader.jsx` & `LocationScreen.jsx`.

4. **Sesi 5 (Styling: Inline Style, StyleSheet, Styled Components)**
   - Central constants: `src/theme/` (colors, spacing, typography).
   - Inline style: `HomeScreen.jsx` (warna info card, `Animated.View`).
   - StyleSheet: `getStyles(theme)` di setiap screen/komponen.
   - Styled Components: `SectionHeading.jsx` (`styled-components/native` + `ThemeProvider` di `AppNavigator.jsx`).

5. **Sesi 6 (Progress and Modal)**
   - Progress: `ActivityIndicator` di `LoadingState.jsx`.
   - Measuring Progress: progress bar `react-native-progress` di `BookingProgress.jsx` (persentase form booking yang sudah terisi).
   - Modal: `AppModal.jsx` dengan 3 tipe informasi — alert (form belum lengkap), confirmation (kirim booking, hapus riwayat, preview paket), notification (draft dipulihkan, riwayat dihapus; hilang sendiri). `Alert.alert` bawaan untuk error koneksi dan konfirmasi logout.

6. **Sesi 7 (Handling Gestures)**
   - Touchable: `TouchableOpacity` di `DriverCard.jsx` (tap buka/tutup profil), `TouchableHighlight` + `onLongPress` di `StatusScreen.jsx` (tekan lama untuk hapus riwayat), `TouchableWithoutFeedback` di backdrop `AppModal.jsx`, `TouchableNativeFeedback` (Android) di `SettingsScreen.jsx`.
   - Button component: tombol "Keluar" di `SettingsScreen.jsx`.
   - Pressable: semua tombol, plus `onLongPress` di `PackageCard.jsx` untuk preview paket dan `onPressIn`/`onPressOut` di `LoginScreen.jsx` (tahan untuk intip password).
   - ScrollView events di `HomeScreen.jsx`: `onScroll` (tombol kembali ke atas), `onScrollBeginDrag`/`onScrollEndDrag`, `onMomentumScrollEnd` (indikator titik list armada).
   - `FlatList` untuk list armada (horizontal) dan riwayat booking.

7. **Sesi 8 (Animated API)**
   - Implementasi pada: Animasi fade-in dan slide-up di `HomeScreen.jsx`.

8. **Sesi 9 (AsyncStorage)**
   - Implementasi pada: Penyimpanan otomatis draft form dan status booking aktif di `BookingScreen.jsx`.

9. **Sesi 10 (Lokasi, Permissions)**
   - Implementasi pada: `LocationScreen.jsx` (dengan fallback UI jika tidak didukung Expo Go).

10. **Sesi 11 (Fetch, Mock API)**
    - Implementasi pada: `src/services/availabilityService.js` dan integrasi simulasi di `AvailabilityCard.jsx`.

11. **Sesi 12 (Testing dengan Jest)**
    - Implementasi pada: `__tests__/` untuk kalkulasi harga, validasi form, styled-components, dan alur aplikasi (`appFlow.test.js`).

12. **Sesi 13 (Deployment Expo)**
    - Menggunakan build commands Expo modern (`npx expo`) dan siap untuk `eas build`.

## Expo Go vs Development Build

- **Expo Go**: Cocok untuk testing komponen UI standar dan JS murni. MapView mungkin terbatas.
- **Development Build**: Diperlukan saat project menambahkan native module (seperti peta lengkap) via EAS.
- **APK/AAB/IPA**: Adalah production bundle yang dibuat dengan `eas build`.


AI digunakan sebagai assistant untuk penjelasan konsep dan review kode
