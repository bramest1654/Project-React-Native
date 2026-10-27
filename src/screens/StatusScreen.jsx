import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import BrandHeader from "../components/BrandHeader";
import { useApp } from "../navigation/AppNavigator";
import { formatRupiah } from "../utils/pricing";

export default function StatusScreen({ navigation }) {
  const { theme, booking } = useApp();
  const styles = getStyles(theme);
  const history = booking ? [booking] : [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <BrandHeader navigation={navigation} title="STATUS" />

        <Text style={styles.eyebrow}>RIWAYAT PESANAN</Text>
        <Text style={styles.pageTitle}>
          Semua perjalanan,{"\n"}
          <Text style={styles.goldText}>tercatat rapi.</Text>
        </Text>

        {history.length > 0 ? (
          history.map((booking, index) => (
            <View key={booking.code || index} style={styles.statusCard}>
              <View style={styles.statusTop}>
                <View style={styles.statusPill}>
                  <Text style={styles.statusPillText}>
                    {index === 0 ? "ONGOING" : "COMPLETED"}
                  </Text>
                </View>
                <Text style={styles.bookingCode}>{booking.code}</Text>
              </View>

              <Text style={styles.packageTitle}>{booking.packageName}</Text>

              <View style={styles.statusGrid}>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>PENUMPANG</Text>
                  <Text style={styles.gridValue}>{booking.name}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>JADWAL</Text>
                  <Text style={styles.gridValue}>
                    {booking.date} · {booking.time}
                  </Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>RUTE</Text>
                  <Text style={styles.gridValue}>
                    {booking.pickup} → {booking.destination}
                  </Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>TOTAL ESTIMASI</Text>
                  <Text style={styles.gridValue}>
                    {formatRupiah(booking.total)}
                  </Text>
                </View>
              </View>

              <View style={styles.actionRow}>
                <Pressable
                  style={({ pressed }) => [
                    styles.outlineButton,
                    pressed && styles.pressed,
                  ]}
                  onPress={() => navigation.navigate("Booking")}
                >
                  <Text style={styles.outlineText}>Pesan lagi →</Text>
                </Pressable>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Belum ada riwayat</Text>
            <Text style={styles.emptyBody}>
              Isi detail perjalanan untuk mulai memesan layanan VIP kami.
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.pressed,
              ]}
              onPress={() => navigation.navigate("Booking")}
            >
              <Text style={styles.primaryText}>Mulai booking →</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.paper },
    content: { padding: 22, paddingBottom: 110, gap: 16 },
    eyebrow: {
      color: theme.gold,
      fontSize: 10,
      letterSpacing: 1.2,
      fontWeight: "700",
      marginBottom: 6,
    },
    pageTitle: {
      color: theme.text,
      fontSize: 32,
      lineHeight: 36,
      fontWeight: "800",
      letterSpacing: -1.5,
      marginBottom: 16,
    },
    goldText: { color: theme.gold },
    statusCard: {
      backgroundColor: theme.card,
      borderLeftWidth: 4,
      borderLeftColor: theme.gold,
      padding: 22,
      marginBottom: 20,
      borderRadius: 8,
    },
    statusTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    statusPill: {
      backgroundColor: theme.goldLight,
      paddingVertical: 7,
      paddingHorizontal: 10,
      borderRadius: 4,
    },
    statusPillText: {
      color: theme.text,
      fontSize: 9,
      fontWeight: "800",
      textTransform: "uppercase",
    },
    bookingCode: {
      color: theme.gold,
      fontSize: 13,
      fontWeight: "800",
      letterSpacing: 1,
    },
    packageTitle: {
      color: theme.text,
      fontSize: 22,
      fontWeight: "800",
      marginBottom: 18,
    },
    statusGrid: {
      gap: 14,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.line,
      paddingVertical: 18,
      marginBottom: 18,
    },
    gridItem: { gap: 4 },
    gridLabel: {
      color: theme.muted,
      fontSize: 9,
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: 0.8,
    },
    gridValue: { color: theme.text, fontSize: 13, fontWeight: "700" },
    actionRow: { flexDirection: "row", gap: 12, flexWrap: "wrap" },
    primaryButton: {
      backgroundColor: theme.navy,
      paddingVertical: 12,
      paddingHorizontal: 18,
      borderRadius: 8,
    },
    primaryText: { color: theme.white, fontSize: 13, fontWeight: "800" },
    outlineButton: {
      borderWidth: 1,
      borderColor: theme.text,
      paddingVertical: 11,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    outlineText: { color: theme.text, fontSize: 12, fontWeight: "800" },
    pressed: { opacity: 0.7 },
    emptyState: {
      backgroundColor: theme.card,
      padding: 22,
      borderWidth: 1,
      borderColor: theme.line,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 20,
    },
    emptyTitle: {
      color: theme.text,
      fontSize: 20,
      fontWeight: "800",
      marginBottom: 8,
    },
    emptyBody: {
      color: theme.muted,
      fontSize: 13,
      marginBottom: 20,
      textAlign: "center",
    },
  });
