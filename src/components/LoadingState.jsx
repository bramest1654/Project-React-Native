import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useApp } from "../navigation/AppNavigator";

/**
 * ActivityIndicator with message text, navy-gold themed.
 * Sesi 6: ActivityIndicator for loading states
 */
export default function LoadingState({ message = "Memuat..." }) {
  const { theme } = useApp();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={theme.gold} />
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
    text: {
      color: theme.muted,
      fontSize: 12,
    },
  });
