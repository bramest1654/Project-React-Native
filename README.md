# Anterin Venture Prototype

Prototype aplikasi React Native untuk Anterin Premium Transport Service.

## Panduan Instalasi & Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Jalankan Metro Bundler
npx expo start

# 3. Jalankan di iOS Simulator
npx expo start --ios

# 4. Jalankan di Android Emulator
npx expo start --android
```

## Mapping Fitur Terhadap Sesi React Native (1-13)

Project ini dirancang sebagai prototype venture creation sekaligus implementasi materi React Native:

1. **Sesi 1-2 (Components, JSX, Props, State, Component Composition, One-way Data Flow)**
   - Implementasi pada: `BrandHeader.jsx`, `PackageCard.jsx`, `PriceSummary.jsx`.
   - Data flow dari `AppNavigator` Context ke halaman-halaman.

2. **Sesi 3 (TextInput, Picker, Switch, DateTimePicker, Validasi)**
   - Implementasi pada: `BookingScreen.jsx` (form pemesanan lengkap).
   - Utility validasi ada di `src/utils/validation.js`.

3. **Sesi 4 (Flexbox, Stack Navigator, Navigasi Halaman)**
   - Implementasi pada: `AppNavigator.jsx` dan flex layout di seluruh halaman.

4. **Sesi 5 (StyleSheet, Central Color Constants)**
   - Implementasi pada: `src/theme/` (colors, spacing, typography).

5. **Sesi 6 (Progress and Modal)**
   - Progress: `ActivityIndicator` di `LoadingState.jsx`.
   - Measuring Progress: progress bar `react-native-progress` di `BookingProgress.jsx` (persentase form booking yang sudah terisi).
   - Modal: `AppModal.jsx` dengan 3 tipe informasi — alert (form belum lengkap, koneksi gagal), confirmation (kirim booking, hapus riwayat, preview paket), notification (draft dipulihkan, riwayat dihapus; hilang sendiri).

6. **Sesi 7 (Handling Gestures)**
   - Touchable: `TouchableOpacity` di `DriverCard.jsx` (tap buka/tutup profil), `TouchableHighlight` + `onLongPress` di `StatusScreen.jsx` (tekan lama untuk hapus riwayat).
   - Pressable: semua tombol, plus `onLongPress` di `PackageCard.jsx` untuk preview paket.
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
    - Implementasi pada: `__tests__/` untuk kalkulasi harga dan validasi form.

12. **Sesi 13 (Deployment Expo)**
    - Menggunakan build commands Expo modern (`npx expo`) dan siap untuk `eas build`.

## Expo Go vs Development Build

- **Expo Go**: Cocok untuk testing komponen UI standar dan JS murni. MapView mungkin terbatas.
- **Development Build**: Diperlukan saat project menambahkan native module (seperti peta lengkap) via EAS.
- **APK/AAB/IPA**: Adalah production bundle yang dibuat dengan `eas build`.


AI digunakan sebagai assistant untuk penjelasan konsep dan review kode
