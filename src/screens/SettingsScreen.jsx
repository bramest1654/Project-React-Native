import React from "react";
import {
  View,
  Text,
  Switch,
  Button,
  Alert,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import BrandHeader from "../components/BrandHeader";
import GlassCard from "../components/GlassCard";
import { useApp } from "../navigation/AppNavigator";
import { contactAdmin } from "../services/contactService";

// Sesi 7: TouchableNativeFeedback (efek ripple) cuma ada di Android,
// jadi di iOS pakai TouchableOpacity — sama seperti cara kerja <Button>.
const Touchable =
  Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

/**
 * Settings screen.
 * Sesi 3: Switch untuk toggle dark mode & bahasa
 * Sesi 4: navigation.reset — kembali ke Login dan buang semua screen sebelumnya
 * Sesi 7: Button component, TouchableNativeFeedback / TouchableOpacity
 */
export default function SettingsScreen({ navigation }) {
  const { isDarkMode, toggleTheme, language, setLanguage, theme } = useApp();
  const styles = getStyles(theme);

  const isIndo = language === "id";
  const toggleLanguage = () => setLanguage(isIndo ? "en" : "id");

  function handleLogout() {
    // Konfirmasi pakai Alert bawaan dengan 2 tombol (Sesi 6)
    Alert.alert(
      isIndo ? "Keluar dari akun?" : "Log out?",
      isIndo
        ? "Kamu perlu login lagi untuk memesan."
        : "You will need to log in again to book.",
      [
        { text: isIndo ? "Batal" : "Cancel", style: "cancel" },
        {
          text: isIndo ? "Keluar" : "Log out",
          style: "destructive",
          // reset: stack lama dibuang, Login jadi satu-satunya screen
          // (perilaku "switch navigator" di slide Layout and Navigation)
          onPress: () =>
            navigation.reset({ index: 0, routes: [{ name: "Login" }] }),
        },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <BrandHeader navigation={navigation} title="PENGATURAN" />

        <GlassCard
          style={styles.card}
          intensity={isDarkMode ? 30 : 60}
          tint={isDarkMode ? "dark" : "light"}
        >
          <Text style={styles.eyebrow}>PREFERENSI APLIKASI</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                {isIndo ? "Mode Gelap (Dark Mode)" : "Dark Mode"}
              </Text>
              <Text style={styles.settingDesc}>
                {isIndo
                  ? "Ubah tampilan menjadi biru dongker ala Anterin."
                  : "Switch appearance to Anterin Navy."}
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.line, true: theme.gold }}
              thumbColor={theme.white}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                {isIndo ? "Bahasa Aplikasi" : "App Language"}
              </Text>
              <Text style={styles.settingDesc}>
                {isIndo
                  ? "Gunakan Bahasa Inggris (EN)."
                  : "Use English Language (EN)."}
              </Text>
            </View>
            <Switch
              value={!isIndo}
              onValueChange={toggleLanguage}
              trackColor={{ false: theme.line, true: theme.gold }}
              thumbColor={theme.white}
            />
          </View>
        </GlassCard>

        <GlassCard
          style={styles.card}
          intensity={isDarkMode ? 30 : 60}
          tint={isDarkMode ? "dark" : "light"}
        >
          <Text style={styles.eyebrow}>{isIndo ? "AKUN" : "ACCOUNT"}</Text>

          <Touchable
            onPress={contactAdmin}
            background={TouchableNativeFeedback.Ripple(theme.goldSoft, false)}
            activeOpacity={0.6}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>
                  {isIndo ? "Hubungi Admin" : "Contact Admin"}
                </Text>
                <Text style={styles.settingDesc}>
                  {isIndo
                    ? "Telepon atau email untuk bantuan booking."
                    : "Call or email for booking help."}
                </Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </View>
          </Touchable>

          <View style={styles.divider} />

          {/* Button bawaan React Native — style sudah ditentukan per platform,
              kita cukup atur title dan color */}
          <View style={styles.logoutWrap}>
            <Button
              title={isIndo ? "Keluar" : "Log out"}
              color={theme.danger}
              onPress={handleLogout}
            />
          </View>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.paper },
    content: { padding: 16, paddingBottom: 110 },
    card: { padding: 24, marginTop: 12 },
    eyebrow: {
      color: theme.gold,
      fontSize: 10,
      letterSpacing: 1.2,
      fontWeight: "700",
      marginBottom: 20,
    },
    settingRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
    },
    settingInfo: { flex: 1, paddingRight: 16 },
    settingTitle: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "800",
      marginBottom: 4,
    },
    settingDesc: { color: theme.muted, fontSize: 12, lineHeight: 18 },
    divider: { height: 1, backgroundColor: theme.line, marginVertical: 8 },
    arrow: { color: theme.gold, fontSize: 18, fontWeight: "800" },
    logoutWrap: { alignItems: "flex-start", paddingTop: 8 },
  });
