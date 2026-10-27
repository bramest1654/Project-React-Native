# Pemetaan Materi HAD → Kode Anterin

Dokumen ini memetakan setiap sub-topik materi Hybrid Application Development (Binus Maya) ke bagian kode aplikasi **Anterin** yang menerapkannya. Nama file mengacu ke folder `src/` kecuali disebut lain.

---

## 1. Intro to React & React Native

| Sub-topik | Penerapan / penjelasan |
| --- | --- |
| **Environment Setup** | Sesuai [reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup), project baru disarankan memakai framework **Expo**. Yang dibutuhkan: Node.js (versi LTS), code editor, dan salah satu dari: HP dengan aplikasi **Expo Go**, Android Emulator (Android Studio), atau iOS Simulator (Xcode, khusus macOS). Langkah lengkap ada di bagian *Panduan Instalasi* pada `README.md`. |
| **Advantages of React** | UI deklaratif (kita tulis tampilan berdasarkan state, React yang mengurus update), berbasis komponen yang bisa dipakai ulang (`PackageCard`, `GlassCard`, `Input`, `AppModal`), dan data mengalir satu arah dari parent ke child lewat props. |
| **React API** | `createContext` + `useContext` (`navigation/AppNavigator.jsx`: `AppContext`, `useApp()`, `useTheme()`), `useState` (hampir semua screen), `useEffect` (load draft AsyncStorage di `BookingScreen`, timer notifikasi di `AppModal`), `useMemo` (nilai context di `AppNavigator`), `useCallback` (`updateField` di `BookingScreen`), `useRef` (animasi & ref ScrollView di `HomeScreen`). |
| **Why React Native** | Satu codebase JavaScript menghasilkan UI **native** di Android dan iOS (bukan WebView). Perbedaan platform tetap bisa ditangani dengan `Platform.OS`, contoh: `GlassCard.jsx` (blur di iOS, fallback di Android) dan `SettingsScreen.jsx` (`TouchableNativeFeedback` di Android, `TouchableOpacity` di iOS). |
| **React Native Architecture** | Kode JS dijalankan engine **Hermes** (hasil `npx expo export` berupa bytecode `.hbc`). React Native versi baru (termasuk 0.86 di project ini) memakai **New Architecture**: JS berkomunikasi dengan native lewat **JSI** (tanpa bridge JSON yang asinkron seperti arsitektur lama), UI dirender oleh **Fabric**, dan modul native dimuat sebagai **TurboModules**. |
| **Structure of React** | Pohon komponen: `index.js` → `App.js` → `AppNavigator` (Context + navigator) → screen (`HomeScreen`, `BookingScreen`, …) → komponen kecil (`PackageCard`, `DriverCard`, `PriceSummary`, …). Struktur folder: `navigation/`, `screens/`, `components/`, `theme/`, `utils/`, `services/`, `data/`, `__tests__/`, `assets/`. |
| **React Native Workflow** | Tulis kode → **Metro bundler** (`npx expo start`) mem-bundle JS → aplikasi di Expo Go / emulator memuat bundle → **Fast Refresh** setiap file disimpan → uji dengan **Jest** (`npm test`) → build rilis dengan **EAS Build** (APK/AAB/IPA). |
| **Create Project** | Project dibuat dengan `npx create-expo-app@latest`. Jejaknya: `app.json` (konfigurasi Expo), `index.js` memanggil `registerRootComponent(App)`, dan script `start/android/ios/web` di `package.json`. |
| **React Native** | Seluruh aplikasi ini: React Native 0.86 + Expo SDK 57. |

## 2. Fundamental React Native

| Sub-topik | Penerapan |
| --- | --- |
| **Introduction** | Lihat bagian 1 (Why React Native & Architecture). |
| **Working with Expo** | Expo SDK 57 dengan library Expo: `expo-blur` (`GlassCard`, `BrandHeader`), `expo-linear-gradient` (`HomeScreen`), `expo-location` (`LocationScreen`). Library native dipasang dengan `npx expo install <paket>` supaya versinya cocok dengan SDK (contoh: `react-native-progress` dan `react-native-svg`). |
| **React Fundamentals** | **Komponen fungsi** di semua file `.jsx`. **Props**: `PackageCard({ item, selected, onSelect, onLongPress })`, `SectionHeading({ eyebrow, title, highlight })`. **State**: `useState` untuk form booking, step, modal. **Conditional rendering**: step 1 / step 2 di `BookingScreen`, `{expanded && …}` di `DriverCard`. **List + key**: `packages.map(...)` dengan `key={item.id}`. **Composition**: `BookingScreen` menyusun `BookingField`, `PriceSummary`, `AvailabilityCard`, `BookingProgress`. **One-way data flow**: `AppContext` → screen → komponen. |
| **Core Components** | `View`, `Text`, `Image` (`HomeScreen` hero, `DriverCard`), `ScrollView`, `FlatList`, `TextInput` (`Input`, `BookingField`), `Pressable`, `Switch`, `Button`, `Modal`, `ActivityIndicator`, `SafeAreaView`, `StatusBar`. |

## 3. Collecting Data

| Sub-topik | Penerapan |
| --- | --- |
| **Text Input** | `components/Input.jsx` (pola slide: `View` + `Text` label + `TextInput` dengan `{...props}`) dipakai di `LoginScreen` dengan `secureTextEntry` untuk password. `components/BookingField.jsx` dipakai di `BookingScreen` (nama, nomor HP dengan `keyboardType="phone-pad"`, tujuan, titik jemput & catatan dengan `multiline`). Semua *controlled component* lewat `useState`. |
| **List Options** | `Picker` dari `@react-native-picker/picker` di `BookingScreen`: jumlah penumpang, koper, tipe perjalanan, dan extra hour. |
| **Toggle** | `Switch` di `SettingsScreen` untuk dark mode dan bahasa. |
| **Date Time** | `DateTimePicker` dari `@react-native-community/datetimepicker` di `BookingScreen` untuk tanggal & waktu jemput. Variasi platform ditangani manual: `display="inline"`/`"spinner"` di iOS, dialog default di Android. |

## 4. Layout and Navigation

| Sub-topik | Penerapan |
| --- | --- |
| **Flexbox** | Hampir semua layout. Contoh: `settingRow` di `SettingsScreen` (`flexDirection: "row"`, `justifyContent: "space-between"`, `alignItems: "center"`). |
| **Flex Direction** | `twoColumns` di `BookingScreen` (`row`, dua kolom berdampingan) vs `containerLarge` di `LoadingState` (`column`, spinner di atas teks). |
| **Flex** | `column: { flex: 1 }` di `BookingScreen` membagi lebar dua kolom sama rata. `container: { flex: 1 }` membuat screen memenuhi layar. |
| **Navigation / React Navigation** | `navigation/AppNavigator.jsx`: **Stack Navigator** (`Login` → `MainTabs`, `Location`, `Settings`, dengan `initialRouteName="Login"`) dan **Tab Navigator** (`Home`, `Booking`, `Status`, tab bar custom `GlassDock`). Perilaku seperti *switch navigator* (halaman lama dibuang): `navigation.replace("MainTabs")` setelah login dan `navigation.reset(...)` ke `Login` saat logout di `SettingsScreen`. **Nested navigation**: `navigation.navigate("MainTabs", { screen: "Booking", params })` di `LocationScreen` dan menu `BrandHeader`. |

## 5. Styling

| Sub-topik | Penerapan |
| --- | --- |
| **Introduction** | Nilai desain dipusatkan di `theme/colors.js` (light & dark theme), `theme/typography.js`, dan `theme/spacing.js`, jadi tidak di-hardcode berulang-ulang. |
| **Inline Style** | `HomeScreen`: `style={[styles.infoCardSolid, { backgroundColor: theme.navy }]}` dan `Animated.View style={{ opacity: fadeAnim, transform: [...] }}`. Cocok untuk nilai dinamis. |
| **StyleSheet** | Setiap screen/komponen punya `getStyles(theme)` berisi `StyleSheet.create({...})` di bawah komponennya. |
| **Styled Components** | `components/SectionHeading.jsx` memakai `styled-components/native` (`styled.View`, `styled.Text` dengan tagged template literal). Ukuran diambil dari `typography.js`/`spacing.js`, warna dari `ThemeProvider` yang membungkus app di `AppNavigator.jsx`. Dipakai di `BookingScreen` dan `StatusScreen`. |

## 6. Progress and Modal

| Sub-topik | Penerapan |
| --- | --- |
| **Progress** | `ActivityIndicator` di `components/LoadingState.jsx`: `size="small"` di tombol konfirmasi booking, `size="large"` di tengah layar saat `StatusScreen` memuat riwayat. |
| **Measuring Progress** | `components/BookingProgress.jsx` memakai `Progress.Bar` dari `react-native-progress` (React Native tidak punya progress bar bawaan). Nilainya dari `getFormProgress(form)` di `utils/validation.js`: persentase field wajib yang sudah valid. |
| **Modal** | `components/AppModal.jsx` dengan 3 tipe informasi dari slide. **Alert**: "Form belum lengkap" (`BookingScreen`). **Confirmation**: "Kirim booking?", "Hapus booking?", preview paket di `HomeScreen`. **Notification**: "Draft dipulihkan", "Riwayat diperbarui" (hilang sendiri setelah 2,5 detik). Juga `Alert.alert` bawaan untuk error koneksi (`BookingScreen`), pilihan kontak admin (`services/contactService.js`), dan konfirmasi logout (`SettingsScreen`). |

## 7. Handling Gestures

| Sub-topik | Penerapan |
| --- | --- |
| **Gestures / Simple Taps** | `onPress` di semua tombol dan kartu. |
| **Touchable** | `TouchableOpacity`: `DriverCard` (tap buka/tutup profil driver). `TouchableHighlight` + `onLongPress` + `delayLongPress`: kartu riwayat di `StatusScreen` (tekan lama untuk hapus). `TouchableWithoutFeedback`: backdrop `AppModal` (tap di luar kotak untuk menutup). `TouchableNativeFeedback` (ripple, Android) / `TouchableOpacity` (iOS): baris "Hubungi Admin" di `SettingsScreen`. |
| **onPressIn / onPressOut / onPress / onLongPress** | `LoginScreen`: tahan tombol untuk intip password (`onPressIn` tampilkan, `onPressOut` sembunyikan). `PackageCard`: `onPress` pilih paket, `onLongPress` buka ringkasan paket. |
| **Button Component** | `Button` bawaan React Native untuk "Keluar" di `SettingsScreen` (cukup atur `title`, `color`, `onPress`). |
| **Pressable Component** | Semua tombol utama, dengan style fungsi `({ pressed }) => [...]` untuk feedback visual saat ditekan. |
| **ScrollView** | `HomeScreen`: `onScroll` + `scrollEventThrottle` memunculkan tombol "↑" kembali ke atas, `onScrollBeginDrag` / `onScrollEndDrag` meredupkan tombol itu saat layar sedang di-drag, `onMomentumScrollEnd` di list armada meng-update titik indikator. List armada (horizontal) dan riwayat booking memakai `FlatList`. |

---

### Pengujian

`npm test` menjalankan Jest (`jest-expo` + `@testing-library/react-native`):

- `__tests__/pricing.test.js`, `validation.test.js`, `booking.test.js`: fungsi utilitas (termasuk `getFormProgress`).
- `__tests__/sectionHeading.test.js`: styled-components membaca nilai dari file tema.
- `__tests__/appFlow.test.js`: alur aplikasi (intip password, long press paket, scroll, progress bar form, hapus riwayat, navigasi dari Settings, logout).
