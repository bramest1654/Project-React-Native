import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import { useTheme } from "../navigation/AppNavigator";
import BrandHeader from "../components/BrandHeader";
import GlassCard from "../components/GlassCard";
import Input from "../components/Input";

/**
 * LoginScreen — layar masuk sebelum TabNavigator.
 * Sesi "Collecting Data": Controlled components dengan useState,
 * reusable Input component, dan navigasi ke MainTabs setelah submit.
 *
 * Auth beneran menyusul di sesi "Communicate with Servers".
 */
export default function LoginScreen({ navigation }) {
  const theme = useTheme();
  const styles = getStyles(theme);

  // Controlled state — pola dari slide "Collecting Data"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    // Auth beneran belum — digarap di sesi "Communicate with Servers"
    console.log("Login attempt:", { username, password });
    navigation.replace("MainTabs");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Brand Header — reuse existing component, hide menu ── */}
        <BrandHeader navigation={navigation} showMenu={false} />

        {/* ── Hero copy ── */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            Selamat{"\n"}
            <Text style={styles.goldText}>Datang.</Text>
          </Text>
          <Text style={styles.subtitle}>
            Masuk untuk melanjutkan perjalanan Anda bersama Anterin.
          </Text>
        </View>

        {/* ── Login Form ── */}
        <GlassCard
          style={styles.formCard}
          intensity={theme.isDark ? 30 : 60}
          tint={theme.isDark ? "dark" : "light"}
        >
          <Text style={styles.eyebrow}>MASUK KE AKUN</Text>

          {/* Pola persis dari slide Collecting Data */}
          <Input
            label="Username"
            placeholder="Masukkan username Anda"
            onChangeText={setUsername}
            value={username}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            label="Password"
            placeholder="Masukkan password Anda"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />

          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.pressed,
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Masuk</Text>
          </Pressable>
        </GlassCard>

        {/* ── Footer note ── */}
        <Text style={styles.footerNote}>
          Anterin · Private Driver Service
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.paper,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingBottom: 40,
      justifyContent: "center",
    },

    // ── Hero copy ──
    heroSection: {
      paddingHorizontal: 4,
      marginBottom: 28,
    },
    heroTitle: {
      color: theme.text,
      fontSize: 42,
      lineHeight: 46,
      fontWeight: "800",
      letterSpacing: -2,
      marginBottom: 12,
    },
    goldText: {
      color: theme.gold,
    },
    subtitle: {
      color: theme.muted,
      fontSize: 14,
      lineHeight: 22,
    },

    // ── Form card ──
    formCard: {
      padding: 24,
      marginBottom: 24,
    },
    eyebrow: {
      color: theme.gold,
      fontSize: 10,
      letterSpacing: 1.5,
      fontWeight: "700",
      marginBottom: 20,
    },

    // ── Button ──
    loginButton: {
      backgroundColor: theme.navy,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
      marginTop: 8,
      shadowColor: theme.navy,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 12,
      elevation: 6,
    },
    loginButtonText: {
      color: theme.gold,
      fontSize: 15,
      fontWeight: "800",
      letterSpacing: 0.5,
    },
    pressed: {
      opacity: 0.75,
      transform: [{ scale: 0.98 }],
    },

    // ── Footer ──
    footerNote: {
      color: theme.muted,
      fontSize: 11,
      textAlign: "center",
      letterSpacing: 0.5,
    },
  });
