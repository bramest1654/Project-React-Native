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

## Mapping Fitur Terhadap Sesi React Native (1-7)

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

5. **Sesi 6 (ActivityIndicator, Modal, Alert)**
   - Implementasi pada: `LoadingState.jsx`, modal konfirmasi di `BookingScreen.jsx`.

6. **Sesi 7 (Pressable, onPress, Interaksi)**
   - Implementasi pada: Seluruh tombol dengan efek visual `opacity` saat ditekan.

AI digunakan sebagai assistant untuk penjelasan konsep dan review kode
