import React, { useRef, useEffect } from "react";
import { Pressable, Text, StyleSheet, Animated } from "react-native";
import { openWhatsApp } from "../services/whatsappService";
import { useApp } from "../navigation/AppNavigator";

export default function FloatingWhatsApp() {
  const { theme } = useApp();
  const styles = getStyles(theme);
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      tension: 50,
      friction: 5,
      useNativeDriver: true,
      delay: 500,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => openWhatsApp()}
      >
        <Text style={styles.icon}>💬</Text>
      </Pressable>
    </Animated.View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 100, // Above the GlassDock
      right: 20,
      zIndex: 1000,
    },
    button: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: "#25D366", // WhatsApp Green
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 8,
      borderWidth: 2,
      borderColor: "rgba(255,255,255,0.2)",
    },
    pressed: {
      opacity: 0.8,
      transform: [{ scale: 0.95 }],
    },
    icon: {
      fontSize: 24,
      color: "#FFF",
    },
  });
