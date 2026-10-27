import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import BrandHeader from "../components/BrandHeader";
import LoadingState from "../components/LoadingState";
import AppModal from "../components/AppModal";
import SectionHeading from "../components/SectionHeading";
import { useApp } from "../navigation/AppNavigator";
import { formatRupiah } from "../utils/pricing";
import { contactAdmin } from "../services/contactService";

/**
 * Status screen — displays saved bookings (History) from AsyncStorage.
 * Sesi 6: Modal konfirmasi hapus + notifikasi
 * Sesi 7: FlatList untuk list riwayat, TouchableHighlight dengan onLongPress
 * Sesi 9: AsyncStorage read (Array JSON)
 */
export default function StatusScreen({ navigation }) {
  const { theme } = useApp();
  const styles = getStyles(theme);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [notice, setNotice] = useState(null);

  const loadHistory = useCallback(() => {
    setLoading(true);
    AsyncStorage.getItem("anterin-history")
      .then((stored) => {
        if (stored) {
          setHistory(JSON.parse(stored));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Reload when tab is focused
  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory]),
  );

  async function handleDelete() {
    const code = deleteTarget.code;
    const next = history.filter((item) => item.code !== code);
    setDeleteTarget(null);
    setHistory(next);
    await AsyncStorage.setItem("anterin-history", JSON.stringify(next)).catch(
      () => {},
    );
    setNotice(`Booking ${code} dihapus dari riwayat.`);
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.content, styles.loadingContent]}>
          <BrandHeader navigation={navigation} title="STATUS" />
          <LoadingState size="large" message="Memuat riwayat booking..." />
        </View>
      </SafeAreaView>
    );
  }

  // Satu item list. Tekan lama (onLongPress) untuk hapus dari riwayat.
  function renderItem({ item: booking, index }) {
    return (
      <TouchableHighlight
        underlayColor={theme.goldSoft}
        activeOpacity={0.9}
        delayLongPress={500}
        onLongPress={() => setDeleteTarget(booking)}
        style={styles.cardTouch}
      >
        <View style={styles.statusCard}>
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
            {index === 0 && (
              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.pressed,
                ]}
                onPress={() => contactAdmin()}
              >
                <Text style={styles.primaryText}>Chat Admin ↗</Text>
              </Pressable>
            )}
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
      </TouchableHighlight>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item, index) => item.code || String(index)}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <BrandHeader navigation={navigation} title="STATUS" />

            <SectionHeading
              eyebrow="RIWAYAT PESANAN"
              title="Semua perjalanan,"
              highlight="tercatat rapi."
            />
            {history.length > 0 && (
              <Text style={styles.hint}>Tekan lama kartu untuk menghapus.</Text>
            )}
          </>
        }
        ListEmptyComponent={
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
        }
      />

      <AppModal
        visible={deleteTarget !== null}
        type="confirmation"
        title="Hapus booking?"
        message={`Booking ${deleteTarget?.code} akan dihapus dari riwayat di HP ini.`}
        confirmText="Hapus"
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
      <AppModal
        visible={notice !== null}
        type="notification"
        title="Riwayat diperbarui"
        message={notice}
        onClose={() => setNotice(null)}
      />
    </SafeAreaView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.paper },
    content: { padding: 22, paddingBottom: 110, gap: 16 },
    loadingContent: { flex: 1 },
    cardTouch: { borderRadius: 8, marginBottom: 20 },
    statusCard: {
      backgroundColor: theme.card,
      borderLeftWidth: 4,
      borderLeftColor: theme.gold,
      padding: 22,
      borderRadius: 8,
    },
    hint: { color: theme.muted, fontSize: 11, marginBottom: 4 },
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
