# Anterin

## Identitas
- Nama: Pande Gde Bramastha Narendra Kusuma Suyitna
- NIM: 2802544835
- Kelas: LA95
- Mata kuliah: COMP6923051 Hybrid Application Development

## Tema Aplikasi
Tema: Transportasi

Anterin ini adalah sebuah aplikasi yang berjenis transportasi rental yang melayani atau ditujukan kepada konsumen VIP maupun konsumen umum dengan menggunakan armada Innova Zenix. Aplikasi Anterin ini mengedepankan pelayanan maksimal.

## Screenshot
(diisi besok: Login, Register, Home, Detail, Booking, Status, Settings)

## Cara Menjalankan
1. `git clone https://github.com/bramest1654/Project-React-Native.git`
2. `npm install`
3. `npx expo start`
4. Tekan `i` untuk membuka iOS Simulator, atau scan QR code dengan aplikasi Expo Go di HP

## Konsep React Native

### Cara Kerja React Native
Kode Anterin memakai bahasa JavaScript dan bisa berjalan di HP iOS maupun Android, asalkan sudah terinstal aplikasi Expo Go. Komponen yang kita tulis di kode, seperti View dan Text, tidak ditampilkan sebagai halaman web, tetapi langsung diubah menjadi tampilan asli (native) milik Android maupun iOS.

### Kelebihan Aplikasi Hybrid
1. Dibuat menggunakan JavaScript, dengan konsep component, props, state, dan navigation, lalu bisa dipakai di OS HP mana pun. Tidak perlu menggunakan bahasa native seperti Kotlin/Java untuk Android dan Swift untuk iOS.
2. Lebih hemat waktu dan biaya, karena cukup satu kode dan satu tim untuk dua platform. Aplikasi cukup dibangun dari kode di VS Code, dan hasil demonya bisa dilihat lewat simulator bawaan.
3. Kode yang kita ketik, seperti logika validasi, langsung berfungsi dan langsung tampil di aplikasi prototipe (fitur Fast Refresh).
4. Banyak programmer dan startup yang memakai React Native untuk membangun aplikasi, dan penggunanya sangat banyak.

### Components
Component adalah sebuah komponen di React Native yang fungsinya membuat potongan tampilan sekali, lalu bisa dipakai berkali-kali, seperti cetakan. Misalnya komponen Input di file LoginScreen dipakai hingga 3 kali (nama, username, dan password) dari satu file `Input.jsx`.

```jsx
<Input
  label="Username"
  placeholder="Masukkan username Anda"
  onChangeText={setUsername}
  value={username}
/>
<Input
  label="Password"
  placeholder="Masukkan password Anda"
  secureTextEntry
  onChangeText={setPassword}
  value={password}
/>
```

### Props
Props yaitu data yang dikirim dari luar ke component, seperti mengisi cetakan tadi. Contohnya, Home mengirim 3 props ke PackageCard: `item` yaitu data paketnya, `selected` yaitu paket yang sedang dipilih atau tidak, dan `onSelect` yaitu apa yang terjadi kalau kita klik kartunya.

```jsx
// HomeScreen.jsx
<PackageCard
  key={item.id}
  item={item}
  selected={false}
  onSelect={(item) => {
    navigation.navigate("Detail", { packageId: item.id });
  }}
/>

// PackageCard.jsx
export default function PackageCard({ item, selected, onSelect }) {
```

### State
State yaitu data yang bisa berubah saat aplikasi sedang berjalan, dan layar yang kita lihat otomatis ikut berubah. Contohnya di LoginScreen ada 5 state: `username`, `password`, dan `name` (isi ketikan), `error` (pesan error berwarna merah), dan `mode` (sedang di menu Login atau Register).

```jsx
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [mode, setMode] = useState("login");
const [name, setName] = useState("");
```

### Navigation
Navigation adalah cara kita pindah layar UI pada aplikasi. Simpelnya, waktu paket di Home kita klik, aplikasi bakal pindah ke layar Detail sambil membawa `packageId`. Kemudian Detail memakai `packageId` itu untuk mencari paket mana yang akan ditampilkan.

```jsx
// HomeScreen.jsx
navigation.navigate("Detail", { packageId: item.id });

// DetailScreen.jsx
const packageId = route.params?.packageId;
const pkg = packages.find((p) => p.id === packageId) || packages[0];
```

## Analisis Kebutuhan

### Masalah
(Masalah apa yang mau diselesaikan Anterin?)

### Target Pengguna
(Siapa yang pakai? Umur, situasi, kebutuhan mereka.)

### Kebutuhan Pengguna
1. 
2. 
3. 
4. 
5. 

### Kebutuhan ke Screen / Komponen
| No | Kebutuhan | Screen | Komponen |
|----|-----------|--------|----------|
| 1 |  |  |  |
| 2 |  |  |  |
| 3 |  |  |  |
| 4 |  |  |  |
| 5 |  |  |  |

### Alasan Desain
(Kenapa pilih warna, layout, urutan layar seperti sekarang?)

### Rencana Pengembangan
(Fitur apa yang mau ditambah nanti?)

## Video Demo
Link: (diisi setelah upload)

## Penggunaan AI
Lihat [AI_USAGE.md](AI_USAGE.md).
