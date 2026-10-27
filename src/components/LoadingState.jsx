import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useApp } from "../navigation/AppNavigator";

/**
 * ActivityIndicator with message text, navy-gold themed.
 * Sesi 6: ActivityIndicator for loading states
 * size "small" untuk di dalam tombol/kartu, "large" untuk loading satu layar
 * (spinner besar di tengah, seperti contoh di slide).
 */
export default function LoadingState({
  message = "Memuat...",
  size = "small",
}) {
  const { theme } = useApp();
  const styles = getStyles(theme);
  const isLarge = size === "large";
  return (
    <View style={[styles.container, isLarge && styles.containerLarge]}>
      <ActivityIndicator size={size} color={theme.gold} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingVertical: 16,
    },
    containerLarge: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      gap: 14,
    },
    text: {
      color: theme.muted,
      fontSize: 12,
    },
  });
