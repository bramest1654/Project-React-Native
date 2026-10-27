import React, { useRef, useEffect, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  Animated,
  StyleSheet,
  Image,
  Platform,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native";
import BrandHeader from "../components/BrandHeader";
import GlassCard from "../components/GlassCard";
import PackageCard from "../components/PackageCard";
import DriverCard from "../components/DriverCard";
import AppModal from "../components/AppModal";
import drivers from "../data/drivers";
import { useApp } from "../navigation/AppNavigator";

const { width } = Dimensions.get("window");

const FLEET_FEATURES = [
  {
    icon: "💺",
    title: "Captain Seat",
    desc: "Kursi baris kedua independen untuk kenyamanan VIP & ruang kaki ekstra.",
  },
  {
    icon: "🤫",
    title: "Kabin Kedap",
    desc: "Perjalanan hening dan minim getaran berkat platform TNGA terbaru.",
  },
  {
    icon: "❄️",
    title: "Dual Zone AC",
    desc: "Pendingin kabin ganda memastikan suhu ideal hingga baris ketiga.",
  },
  {
    icon: "💼",
    title: "Bagasi Luas",
    desc: "Kapasitas bagasi lega untuk koper besar dan barang bawaan.",
  },
];
// Lebar kartu armada (170) + gap (14), dipakai buat hitung index saat scroll
const FLEET_ITEM_WIDTH = 184;

/**
 * Sesi 7: Handling Gestures
 * - ScrollView events: onScroll, onScrollBeginDrag/EndDrag, onMomentumScrollEnd
 * - FlatList horizontal untuk list armada
 * - PackageCard onLongPress buat lihat detail paket (pakai Modal, Sesi 6)
 */

export default function HomeScreen({ navigation }) {
  const { theme, packages, selectedPackage, setSelectedPackage } = useApp();
  const styles = getStyles(theme);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scrollRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fleetIndex, setFleetIndex] = useState(0);
  const [previewPackage, setPreviewPackage] = useState(null);

  // onScroll jalan terus selama scroll — tombol "ke atas" muncul kalau sudah jauh
  function handleScroll(event) {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowBackToTop(offsetY > 600);
  }

  // onMomentumScrollEnd — list armada berhenti, update titik indikator
  function handleFleetScrollEnd(event) {
    const offsetX = event.nativeEvent.contentOffset.x;
    setFleetIndex(Math.round(offsetX / FLEET_ITEM_WIDTH));
  }

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        onScrollBeginDrag={() => setIsDragging(true)}
        onScrollEndDrag={() => setIsDragging(false)}
      >
        <BrandHeader navigation={navigation} title="" />

        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          {/* Hero image with glass overlay on top */}
          <View style={styles.heroImageContainer}>
            <Image
              source={require("../../assets/hero_zenix_transparent.png")}
              style={styles.heroImage}
              resizeMode="cover"
            />
            {/* Gradient overlay bottom */}
            <LinearGradient
              colors={["transparent", "rgba(244,241,236,0.95)"]}
              style={styles.heroGradient}
            />
          </View>

          {/* Car model badge */}
          <View style={styles.carBadgeWrap}>
            <View style={styles.carBadge}>
              <Text style={styles.carBadgeIcon}>🚕</Text>
              <Text style={styles.carBadgeText}>
                Toyota Kijang Innova Zenix 2.0 G CVT 2025
              </Text>
            </View>

            {/* 12 jam and 6 pax info cards */}
            <View style={styles.infoCardsRow}>
              <View
                style={[styles.infoCardSolid, { backgroundColor: theme.navy }]}
              >
                <Text style={[styles.infoCardNum, { color: theme.gold }]}>
                  12 jam
                </Text>
                <Text style={[styles.infoCardLabel, { color: theme.white }]}>
                  Layanan harian
                </Text>
              </View>
              <View
                style={[styles.infoCardSolid, { backgroundColor: theme.gold }]}
              >
                <Text style={[styles.infoCardNum, { color: theme.navy }]}>
                  6 pax
                </Text>
                <Text style={[styles.infoCardLabel, { color: theme.navy }]}>
                  Kapasitas maksimum
                </Text>
              </View>
            </View>
          </View>

          {/* Eyebrow + headline */}
          <Text style={styles.eyebrow}>PREMIUM TRANSPORT · SEMARANG</Text>
          <Text style={styles.heroTitle}>
            Duduk tenang,{"\n"}kami{" "}
            <Text style={styles.goldText}>antarkan.</Text>
          </Text>
          <Text style={styles.body}>
            Toyota Innova Zenix terbaru dengan driver profesional untuk agenda
            bisnis, keluarga, dan perjalanan istimewa.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
            onPress={() => navigation.navigate("Booking")}
          >
            <Text style={styles.primaryText}>Jadwalkan perjalanan →</Text>
          </Pressable>
        </Animated.View>

        {/* Glass feature strip */}
        <View style={styles.featureRow}>
          {[
            {
              num: "01",
              title: "Driver profesional",
              desc: "Berpengalaman, sopan, dan tepat waktu.",
            },
            {
              num: "02",
              title: "Kabin prima",
              desc: "Bersih, wangi, bebas asap.",
            },
            {
              num: "03",
              title: "Fleksibel",
              desc: "Bisnis, wisata, event, VIP.",
            },
          ].map((f) => (
            <GlassCard
              key={f.num}
              style={styles.featureCard}
              intensity={50}
              tint="light"
            >
              <Text style={styles.goldMono}>{f.num}</Text>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.smallText}>{f.desc}</Text>
            </GlassCard>
          ))}
        </View>

        {/* Fleet Advantages Section */}
        <View style={styles.fleetSection}>
          <Text style={styles.eyebrow}>ARMADA KAMI</Text>
          <Text style={styles.sectionTitle}>
            Kenyamanan kelas atas{"\n"}
            <Text style={styles.goldText}>Toyota Innova Zenix.</Text>
          </Text>

          <FlatList
            horizontal
            data={FLEET_FEATURES}
            keyExtractor={(item) => item.title}
            showsHorizontalScrollIndicator={false}
            style={styles.fleetScroll}
            contentContainerStyle={styles.fleetScrollContent}
            snapToInterval={FLEET_ITEM_WIDTH}
            decelerationRate="fast"
            onMomentumScrollEnd={handleFleetScrollEnd}
            renderItem={({ item }) => (
              <View style={styles.fleetCard}>
                <Text style={styles.fleetIcon}>{item.icon}</Text>
                <Text style={styles.fleetTitle}>{item.title}</Text>
                <Text style={styles.fleetDesc}>{item.desc}</Text>
              </View>
            )}
          />
          <View style={styles.dotRow}>
            {FLEET_FEATURES.map((item, i) => (
              <View
                key={item.title}
                style={[styles.dot, i === fleetIndex && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        {/* Why Choose Anterin Section */}
        <View style={styles.reasonsSection}>
          <Text style={styles.eyebrow}>ALASAN MEMILIH KAMI</Text>
          <Text style={styles.sectionTitle}>
            Keunggulan layanan{"\n"}
            <Text style={styles.goldText}>Anterin Premium.</Text>
          </Text>

          <View style={styles.reasonsList}>
            {[
              {
                title: "Armada Terawat & Bersih",
                desc: "Setiap armada melewati pengecekan ketat dan sanitasi sebelum menjemput Anda.",
              },
              {
                title: "Ketepatan Waktu (On-Time)",
                desc: "Driver kami tiba 15 menit sebelum waktu penjemputan. Bebas khawatir terlambat.",
              },
              {
                title: "Harga Transparan",
                desc: "Tarif all-in termasuk bensin, tol, dan driver. Tidak ada biaya tersembunyi.",
              },
              {
                title: "Privasi & Kenyamanan",
                desc: "Standar pelayanan VIP yang menjamin kerahasiaan dan kenyamanan penumpang.",
              },
            ].map((reason, index) => (
              <View key={index} style={styles.reasonItem}>
                <View style={styles.reasonIconWrap}>
                  <Text style={styles.reasonIconText}>{index + 1}</Text>
                </View>
                <View style={styles.reasonTextWrap}>
                  <Text style={styles.reasonTitle}>{reason.title}</Text>
                  <Text style={styles.reasonDesc}>{reason.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* --- SERVICES SECTION MERGED --- */}
        <View style={styles.servicesContainer}>
          <Text style={styles.eyebrow}>PILIHAN PAKET</Text>
          <Text style={styles.sectionTitle}>
            Pilih perjalanan{"\n"}
            <Text style={styles.goldText}>versi kamu.</Text>
          </Text>

          <Text style={styles.hint}>
            Tekan lama kartu paket untuk lihat ringkasannya.
          </Text>

          {packages.map((item) => (
            <PackageCard
              key={item.id}
              item={item}
              selected={false}
              onSelect={(item) => {
                setSelectedPackage(item);
                navigation.navigate("Booking");
              }}
              onLongPress={(item) => setPreviewPackage(item)}
            />
          ))}

          {/* Vehicle info */}
          <View style={styles.darkBand}>
            <Text style={styles.darkTitle}>
              Satu kabin, banyak kemungkinan.
            </Text>
            <View style={styles.infoGrid}>
              {[
                { num: "6", label: "Penumpang nyaman" },
                { num: "2", label: "Koper besar" },
                { num: "12h", label: "Durasi maksimal" },
                { num: "2025", label: "Unit terbaru" },
              ].map((i) => (
                <View key={i.num} style={styles.infoItem}>
                  <Text style={styles.infoNumber}>{i.num}</Text>
                  <Text style={styles.infoLabel}>{i.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Included / not included */}
          <View style={styles.section}>
            <GlassCard style={styles.infoCard} intensity={40} tint="light">
              <Text style={styles.eyebrow}>SUDAH TERMASUK</Text>
              <Text style={styles.sectionTitle}>
                Yang membuat perjalanan ringan
              </Text>
              {[
                "Driver dan BBM",
                "Unit bersih serta higienis",
                "Air mineral dan tisu untuk Signature",
                "Persiapan kabin sebelum penjemputan",
              ].map((item) => (
                <Text key={item} style={styles.listItem}>
                  ✓ {item}
                </Text>
              ))}
            </GlassCard>
          </View>

          <View style={styles.section}>
            <GlassCard style={styles.infoCard} intensity={40} tint="light">
              <Text style={styles.eyebrow}>PERLU DIPERHATIKAN</Text>
              <Text style={styles.sectionTitle}>Biaya di luar paket</Text>
              {[
                "Tol dan parkir kendaraan",
                "Penggunaan di atas 12 jam",
                "Perubahan rute atau tambahan titik",
                "Konfirmasi akhir oleh admin",
              ].map((item) => (
                <Text key={item} style={styles.listItem}>
                  - {item}
                </Text>
              ))}
            </GlassCard>
          </View>

          {/* Driver profiles */}
          <View style={styles.section}>
            <Text style={styles.eyebrow}>TIM DRIVER ANTERIN</Text>
            <Text style={styles.sectionTitle}>
              Kenali siapa yang{"\n"}akan menemanimu.
            </Text>
            <Text style={styles.body}>
              Semua driver Anterin telah melalui seleksi ketat dan pelatihan
              protokol.
            </Text>
            {drivers.map((driver) => (
              <DriverCard key={driver.id} driver={driver} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Tombol kembali ke atas, muncul dari event onScroll */}
      {showBackToTop && (
        <Pressable
          style={({ pressed }) => [
            styles.backToTop,
            isDragging && styles.backToTopDragging,
            pressed && styles.pressed,
          ]}
          onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
        >
          <Text style={styles.backToTopText}>↑</Text>
        </Pressable>
      )}

      <AppModal
        visible={previewPackage !== null}
        type="confirmation"
        title={previewPackage?.name}
        message={
          previewPackage
            ? `${previewPackage.description}\n\n${previewPackage.features.join(" · ")}`
            : ""
        }
        confirmText="Booking paket ini"
        cancelText="Tutup"
        onConfirm={() => {
          setSelectedPackage(previewPackage);
          setPreviewPackage(null);
          navigation.navigate("Booking");
        }}
        onClose={() => setPreviewPackage(null)}
      />
    </SafeAreaView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.paper },
    content: { paddingBottom: 160 },

    // Hero image
    heroImageContainer: {
      marginHorizontal: 16,
      marginBottom: 24,
      borderRadius: 24,
      overflow: "hidden",
      height: 260,
    },
    heroImage: { width: "100%", height: "100%" },
    heroGradient: {
      ...StyleSheet.absoluteFillObject,
      top: "50%",
    },
    statRow: {
      position: "absolute",
      bottom: 16,
      left: 16,
      flexDirection: "row",
      gap: 10,
    },
    statPill: {
      borderRadius: 14,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.4)",
      backgroundColor: "rgba(255,255,255,0.15)",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
    },
    statShineLine: {
      height: 1,
      backgroundColor: "rgba(255,255,255,0.55)",
      marginHorizontal: 10,
      marginTop: 1,
    },
    statInner: { paddingHorizontal: 14, paddingBottom: 10, paddingTop: 6 },
    statNumber: { color: theme.text, fontSize: 16, fontWeight: "800" },
    statLabel: { color: theme.muted, fontSize: 10, marginTop: 1 },

    // Car badge
    carBadgeWrap: {
      alignItems: "center",
      marginTop: -40,
      marginBottom: 24,
      zIndex: 10,
    },
    carBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: theme.navy,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.gold,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    carBadgeIcon: { fontSize: 13 },
    carBadgeText: { color: theme.gold, fontSize: 11, fontWeight: "800" },
    infoCardsRow: { flexDirection: "row", gap: 12, marginTop: 16 },
    infoCardSolid: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    infoCardNum: { fontSize: 16, fontWeight: "900", marginBottom: 2 },
    infoCardLabel: { fontSize: 10, fontWeight: "700" },

    // Copy
    eyebrow: {
      color: theme.gold,
      fontSize: 10,
      letterSpacing: 1.2,
      fontWeight: "700",
      marginBottom: 12,
      paddingHorizontal: 22,
    },
    heroTitle: {
      color: theme.text,
      fontSize: 40,
      lineHeight: 44,
      fontWeight: "800",
      letterSpacing: -2,
      marginBottom: 14,
      paddingHorizontal: 22,
    },
    goldText: { color: theme.gold },
    body: {
      color: theme.muted,
      fontSize: 14,
      lineHeight: 22,
      marginBottom: 24,
      paddingHorizontal: 22,
    },
    primaryButton: {
      alignSelf: "flex-start",
      backgroundColor: theme.navy,
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginBottom: 10,
      borderRadius: 12,
      marginHorizontal: 22,
    },
    primaryText: { color: theme.white, fontSize: 13, fontWeight: "800" },
    pressed: { opacity: 0.7 },

    // Glass feature strip
    featureRow: {
      flexDirection: "row",
      gap: 10,
      paddingHorizontal: 16,
      marginVertical: 24,
    },
    featureCard: {
      flex: 1,
      padding: 14,
      gap: 6,
    },
    goldMono: {
      color: theme.gold,
      fontSize: 10,
      fontWeight: "700",
      letterSpacing: 1,
    },
    featureTitle: { color: theme.text, fontSize: 11, fontWeight: "800" },
    smallText: { color: theme.muted, fontSize: 10, lineHeight: 15 },

    // Services merged
    servicesContainer: {
      paddingHorizontal: 22,
      paddingTop: 10,
      paddingBottom: 20,
    },
    darkBand: {
      backgroundColor: theme.navy,
      padding: 24,
      marginTop: 24,
      borderRadius: 16,
    },
    darkTitle: {
      color: theme.white,
      fontSize: 22,
      fontWeight: "800",
      marginBottom: 18,
    },
    infoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
    infoItem: { width: "44%", gap: 4 },
    infoNumber: { color: theme.white, fontSize: 24, fontWeight: "800" },
    infoLabel: { color: "#c7d0dd", fontSize: 11 },
    section: { paddingVertical: 10 },
    infoCard: { padding: 20, marginVertical: 8 },
    listItem: { color: theme.muted, fontSize: 13, marginBottom: 8 },

    // CTA
    ctaSection: { paddingHorizontal: 16, paddingVertical: 20 },
    ctaCard: { padding: 24 },
    sectionTitle: {
      color: theme.text,
      fontSize: 28,
      lineHeight: 32,
      fontWeight: "800",
      letterSpacing: -1.2,
      marginBottom: 20,
    },
    outlineButton: {
      alignSelf: "flex-start",
      borderWidth: 1.5,
      borderColor: theme.text,
      paddingVertical: 13,
      paddingHorizontal: 18,
      borderRadius: 12,
    },
    outlineText: { color: theme.text, fontSize: 12, fontWeight: "800" },

    // Reasons Section
    reasonsSection: {
      paddingHorizontal: 22,
      paddingTop: 10,
      paddingBottom: 20,
    },
    reasonsList: { marginTop: 24, gap: 16 },
    reasonItem: {
      flexDirection: "row",
      gap: 16,
      alignItems: "flex-start",
      backgroundColor: theme.card,
      padding: 20,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.line,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    reasonIconWrap: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.goldLight,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 2,
    },
    reasonIconText: { color: theme.text, fontSize: 13, fontWeight: "800" },
    reasonTextWrap: { flex: 1 },
    reasonTitle: {
      color: theme.text,
      fontSize: 15,
      fontWeight: "800",
      marginBottom: 4,
    },
    reasonDesc: { color: theme.muted, fontSize: 13, lineHeight: 20 },

    // Fleet Section
    fleetSection: { marginTop: 10, marginBottom: 10 },
    fleetScroll: { marginTop: 16 },
    dotRow: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 6,
      marginTop: 14,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.line,
    },
    dotActive: { width: 18, backgroundColor: theme.gold },
    hint: { color: theme.muted, fontSize: 11, marginBottom: 12 },
    backToTop: {
      position: "absolute",
      right: 20,
      bottom: 120,
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.navy,
      borderWidth: 1,
      borderColor: theme.gold,
      justifyContent: "center",
      alignItems: "center",
    },
    backToTopDragging: { opacity: 0.4 },
    backToTopText: { color: theme.gold, fontSize: 18, fontWeight: "800" },
    fleetScrollContent: { paddingHorizontal: 22, gap: 14 },
    fleetCard: {
      backgroundColor: theme.card,
      padding: 18,
      borderRadius: 16,
      width: 170,
      borderWidth: 1,
      borderColor: theme.line,
    },
    fleetIcon: { fontSize: 28, marginBottom: 12 },
    fleetTitle: {
      color: theme.text,
      fontSize: 14,
      fontWeight: "800",
      marginBottom: 6,
    },
    fleetDesc: { color: theme.muted, fontSize: 12, lineHeight: 18 },
  });
