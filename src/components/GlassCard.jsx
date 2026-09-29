import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { useApp } from "../navigation/AppNavigator";

/**
 * Liquid Glass card — iOS 26 style.
 * Uses BlurView (expo-blur) with layered transparency for that frosted-glass look.
 * Falls back to semi-transparent View on Android.
 */
export default function GlassCard({
  children,
  style,
  intensity = 60,
  tint = "light",
  border = true,
}) {
  const { theme } = useApp();
  const styles = getStyles(theme);
  if (Platform.OS === "android") {
    return (
      <View style={[styles.androidFallback, border && styles.border, style]}>
        {children}
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, border && styles.border, style]}>
      {/* Frosted blur layer */}
      <BlurView
        intensity={intensity}
        tint={tint}
        style={StyleSheet.absoluteFill}
      />
      {/* Subtle gradient shimmer overlay */}
      <View style={styles.shimmer} />
      {/* Content on top */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    wrapper: {
      overflow: "hidden",
      borderRadius: 20,
      backgroundColor: "rgba(255,255,255,0.12)",
    },
    shimmer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(255,255,255,0.08)",
      borderTopWidth: 1,
      borderTopColor: "rgba(255,255,255,0.45)",
      borderRadius: 20,
    },
    border: {
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.30)",
      // Outer shadow
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 24,
    },
    content: {
      position: "relative",
      zIndex: 1,
    },
    androidFallback: {
      borderRadius: 20,
      backgroundColor: "rgba(255,255,255,0.85)",
    },
  });
