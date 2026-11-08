import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import theme from "../theme/colors";
import BrandHeader from "../components/BrandHeader";
import GlassCard from "../components/GlassCard";
import Input from "../components/Input";

export default function LoginScreen({ navigation }) {
  const styles = getStyles(theme);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
    
  function handleLogin() {
    if(mode === "register" && name === "") {
      setError("Nama Anda wajib diisi")
      return;
    }
    if (username === "") {
      setError("Username Anda wajib diisi");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }
    setError("");
    navigation.replace("MainTabs");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <BrandHeader navigation={navigation} showMenu={false} />

        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>
            Selamat{"\n"}
            <Text style={styles.goldText}>Datang.</Text>
          </Text>
          <Text style={styles.subtitle}>
            Masuk untuk melanjutkan perjalanan Anda bersama Anterin.
          </Text>
        </View>

        <GlassCard style={styles.formCard}>
          <Text style={styles.eyebrow}>
            {mode === "login" ? "MASUK KE AKUN" : "DAFTAR AKUN BARU"}
          </Text>

          {mode === "register" && (
            <Input
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap Anda"
              onChangeText={setName}
              value={name}
            />
          )}

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
          {error !== "" && <Text style={styles.errorText}>{error}</Text>}
          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.pressed,
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>
              {mode === "login" ? "Masuk" : "Daftar"}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setMode(mode === "login" ? "register" : "login");
              setError("");
            }}
          >
            <Text style={styles.switchText}>
              {mode === "login"
                ? "Belum punya akun? Daftar"
                : "Sudah punya akun? Masuk"}
            </Text>
          </Pressable>
        </GlassCard>

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
        errorText: {
          switchText: {
      color: theme.text,
      textAlign: "center",
      marginTop: 16,
    }
  },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingBottom: 40,
      justifyContent: "center",
    },

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

    footerNote: {
      color: theme.muted,
      fontSize: 11,
      textAlign: "center",
      letterSpacing: 0.5,
    },
  });
