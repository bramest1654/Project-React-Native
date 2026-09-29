import React from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import BrandHeader from "../components/BrandHeader";
import GlassCard from "../components/GlassCard";
import { useApp } from "../navigation/AppNavigator";

export default function SettingsScreen({ navigation }) {
  const { isDarkMode, toggleTheme, language, setLanguage, theme } = useApp();
  const styles = getStyles(theme);

  const isIndo = language === "id";
  const toggleLanguage = () => setLanguage(isIndo ? "en" : "id");

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
    divider: { height: 1, backgroundColor: theme.line, my: 8 },
  });
