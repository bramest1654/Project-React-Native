import React from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useApp } from "../navigation/AppNavigator";
import { formatRupiah } from "../utils/pricing";

/**
 * Package card with liquid glass styling when selected.
 * Unselected: clean light card.
 * Selected: navy gradient + blur shimmer.
 * Sesi 7: Pressable — onPress pilih paket, onLongPress (opsional) lihat detail.
 */
export default function PackageCard({ item, selected, onSelect, onLongPress }) {
  const { theme } = useApp();
  const styles = getStyles(theme);
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        selected && styles.selectedCard,
        pressed && styles.pressed,
      ]}
      onPress={() => onSelect(item)}
      onLongPress={onLongPress ? () => onLongPress(item) : undefined}
      delayLongPress={400}
    >
      {/* Glass overlay on selected */}
      {selected && Platform.OS === "ios" && (
        <BlurView
          intensity={30}
          tint="dark"
          style={[StyleSheet.absoluteFill, { borderRadius: 20 }]}
        />
      )}

      {/* Gold top border on selected */}
      {selected && <View style={styles.goldAccent} />}

      {/* Shine line at top */}
      <View style={[styles.shineLine, selected && styles.shineLineSelected]} />

      <View style={styles.inner}>
        <View style={styles.topRow}>
          <View style={[styles.badge, selected && styles.badgeSelected]}>
            <Text
              style={[styles.badgeText, selected && styles.badgeTextSelected]}
            >
              {item.label}
            </Text>
          </View>
          {selected && (
            <View style={styles.checkBadge}>
              <Text style={styles.checkText}>✓</Text>
            </View>
          )}
        </View>

        <Text style={[styles.name, selected && styles.nameSelected]}>
          {item.name}
        </Text>
        <Text style={[styles.desc, selected && styles.descSelected]}>
          {item.description}
        </Text>

        <View style={styles.priceRow}>
          <Text style={[styles.price, selected && styles.priceSelected]}>
            {formatRupiah(item.price)}
          </Text>
          <Text style={[styles.priceSub, selected && styles.priceSubSelected]}>
            / 12 jam
          </Text>
        </View>

        <View style={styles.featureList}>
          {item.features.map((f) => (
            <Text
              key={f}
              style={[styles.feature, selected && styles.featureSelected]}
            >
              ✦ {f}
            </Text>
          ))}
        </View>

        <Text style={[styles.cta, selected && styles.ctaSelected]}>
          {selected ? "Paket dipilih ✓" : "Pilih paket  →"}
        </Text>
      </View>
    </Pressable>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    card: {
      marginBottom: 14,
      borderRadius: 20,
      overflow: "hidden",
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.line,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2,
    },
    selectedCard: {
      backgroundColor: theme.navy,
      borderColor: "rgba(255,255,255,0.2)",
      shadowOpacity: 0.22,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 10 },
    },
    pressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },
    goldAccent: {
      height: 3,
      backgroundColor: theme.gold,
    },
    shineLine: {
      height: 1,
      backgroundColor: "rgba(0,0,0,0.05)",
      marginHorizontal: 16,
    },
    shineLineSelected: {
      backgroundColor: "rgba(255,255,255,0.25)",
    },
    inner: { padding: 20, position: "relative", zIndex: 1 },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    badge: {
      borderWidth: 1,
      borderColor: theme.line,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    badgeSelected: {
      borderColor: "rgba(198,154,67,0.5)",
      backgroundColor: "rgba(198,154,67,0.15)",
    },
    badgeText: {
      color: theme.muted,
      fontSize: 9,
      fontWeight: "800",
      letterSpacing: 0.8,
    },
    badgeTextSelected: { color: theme.gold },
    checkBadge: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: theme.gold,
      justifyContent: "center",
      alignItems: "center",
    },
    checkText: { color: theme.text, fontWeight: "900", fontSize: 12 },
    name: {
      color: theme.text,
      fontSize: 20,
      fontWeight: "800",
      letterSpacing: -0.5,
      marginBottom: 6,
    },
    nameSelected: { color: theme.white },
    desc: {
      color: theme.muted,
      fontSize: 12,
      lineHeight: 18,
      marginBottom: 16,
    },
    descSelected: { color: "rgba(255,255,255,0.65)" },
    priceRow: {
      flexDirection: "row",
      alignItems: "baseline",
      gap: 4,
      marginBottom: 14,
    },
    price: { color: theme.text, fontSize: 22, fontWeight: "800" },
    priceSelected: { color: theme.gold },
    priceSub: { color: theme.muted, fontSize: 11 },
    priceSubSelected: { color: "rgba(255,255,255,0.5)" },
    featureList: { gap: 6, marginBottom: 18 },
    feature: { color: theme.muted, fontSize: 12 },
    featureSelected: { color: "rgba(255,255,255,0.75)" },
    cta: { color: theme.text, fontSize: 13, fontWeight: "800" },
    ctaSelected: { color: theme.gold },
  });
