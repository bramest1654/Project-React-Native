import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  Modal,
  SafeAreaView,
} from "react-native";
import { BlurView } from "expo-blur";
import { useApp } from "../navigation/AppNavigator";

// Screen yang ada di dalam Tab Navigator ("MainTabs")
const TAB_SCREENS = ["Home", "Booking", "Status"];

/**
 * Floating liquid-glass nav bar.
 * iOS 26 style: blurred, translucent, with subtle border highlight.
 *
 * Props:
 *   navigation — React Navigation navigation object
 *   title      — optional page title shown in the center
 *   showMenu   — whether to show the 3-dot menu button & navigation modal
 *                (default: true, set false on screens like Login)
 */
export default function BrandHeader({ navigation, title, showMenu = true }) {
  const { theme } = useApp();
  const styles = getStyles(theme);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Pengaturan", screen: "Settings" },
    { label: "Home", screen: "Home" },
    { label: "Booking", screen: "Booking" },
    { label: "Status", screen: "Status" },
    { label: "Lokasi", screen: "Location" },
  ];

  function go(screen) {
    setMenuOpen(false);
    // Home/Booking/Status ada di dalam Tab Navigator yang di-nest di Stack.
    // Supaya bisa dibuka dari screen Stack (Settings, Location), navigasinya
    // lewat "MainTabs" dulu baru ke tab yang dituju (nested navigation).
    if (TAB_SCREENS.includes(screen)) {
      navigation.navigate("MainTabs", { screen });
    } else {
      navigation.navigate(screen);
    }
  }

  /* Brand logo + name — tappable only when menu navigation is available */
  const BrandContent = (
    <>
      <View style={styles.brandMark}>
        <Text style={styles.brandMarkText}>A</Text>
      </View>
      <Text style={styles.brandName}>Anterin</Text>
    </>
  );

  const NavBar = (
    <View style={styles.navWrapper}>
      {Platform.OS === "ios" ? (
        <BlurView intensity={70} tint="light" style={StyleSheet.absoluteFill} />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.androidBg]} />
      )}
      {/* Top shine line */}
      <View style={styles.shineLine} />

      <View style={styles.navInner}>
        {showMenu ? (
          <Pressable onPress={() => go("Home")} style={styles.brand}>
            {BrandContent}
          </Pressable>
        ) : (
          <View style={styles.brand}>{BrandContent}</View>
        )}

        {title ? <Text style={styles.pageTitle}>{title}</Text> : null}

        {showMenu && (
          <Pressable
            style={styles.menuButton}
            onPress={() => setMenuOpen(true)}
            accessibilityLabel="Buka menu navigasi"
          >
            <View style={styles.menuDot} />
            <View style={styles.menuDot} />
            <View style={styles.menuDot} />
          </Pressable>
        )}
      </View>
    </View>
  );

  return (
    <>
      {NavBar}

      {/* Full-screen liquid glass menu — only rendered when showMenu is true */}
      {showMenu && (
        <Modal
          visible={menuOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setMenuOpen(false)}
        >
          <Pressable
            style={styles.menuBackdrop}
            onPress={() => setMenuOpen(false)}
          >
            <View style={styles.menuSheet}>
              {Platform.OS === "ios" ? (
                <BlurView
                  intensity={80}
                  tint="dark"
                  style={StyleSheet.absoluteFill}
                />
              ) : (
                <View style={[StyleSheet.absoluteFill, styles.androidMenuBg]} />
              )}
              <View style={styles.menuShineLine} />
              <View style={styles.menuContent}>
                <Text style={styles.menuEyebrow}>NAVIGASI</Text>
                {navItems.map((item, index) => (
                  <Pressable
                    key={item.screen}
                    style={({ pressed }) => [
                      styles.menuItem,
                      pressed && styles.menuItemPressed,
                      index < navItems.length - 1 && styles.menuItemBorder,
                    ]}
                    onPress={() => go(item.screen)}
                  >
                    <Text style={styles.menuItemText}>{item.label}</Text>
                    <Text style={styles.menuArrow}>→</Text>
                  </Pressable>
                ))}

                <Pressable
                  style={[styles.menuItem, styles.menuClose]}
                  onPress={() => setMenuOpen(false)}
                >
                  <Text style={styles.menuCloseText}>Tutup</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Modal>
      )}
    </>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    navWrapper: {
      marginHorizontal: 16,
      marginTop: Platform.OS === "ios" ? 54 : 20,
      marginBottom: 20,
      borderRadius: 20,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.35)",
      backgroundColor: "rgba(255,255,255,0.08)",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 8,
    },
    shineLine: {
      height: 1,
      backgroundColor: "rgba(255,255,255,0.6)",
      marginHorizontal: 12,
      marginTop: 1,
    },
    navInner: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 13,
    },
    androidBg: {
      backgroundColor: "rgba(248,248,252,0.92)",
    },
    brand: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      flex: 1,
    },
    brandMark: {
      width: 28,
      height: 28,
      borderRadius: 8,
      backgroundColor: theme.navy,
      justifyContent: "center",
      alignItems: "center",
    },
    brandMarkText: {
      color: theme.gold,
      fontWeight: "900",
      fontSize: 14,
    },
    brandName: {
      color: theme.text,
      fontWeight: "800",
      fontSize: 16,
      letterSpacing: -0.5,
    },
    pageTitle: {
      color: theme.muted,
      fontSize: 10,
      fontWeight: "700",
      letterSpacing: 1.5,
      flex: 1,
      textAlign: "center",
    },
    menuButton: {
      flexDirection: "row",
      gap: 4,
      alignItems: "center",
      padding: 6,
    },
    menuDot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.navy,
    },
    // Menu modal
    menuBackdrop: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.3)",
    },
    menuSheet: {
      marginHorizontal: 12,
      marginBottom: 32,
      borderRadius: 24,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.2)",
    },
    androidMenuBg: { backgroundColor: "rgba(18,35,63,0.95)" },
    menuShineLine: {
      height: 1,
      backgroundColor: "rgba(255,255,255,0.3)",
      marginHorizontal: 16,
      marginTop: 1,
    },
    menuContent: {
      padding: 20,
      position: "relative",
      zIndex: 1,
    },
    menuEyebrow: {
      color: theme.goldSoft,
      fontSize: 10,
      fontWeight: "700",
      letterSpacing: 1.5,
      marginBottom: 16,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 18,
    },
    menuItemBorder: {
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255,255,255,0.1)",
    },
    menuItemPressed: { opacity: 0.6 },
    menuItemText: {
      color: theme.white,
      fontSize: 20,
      fontWeight: "700",
      letterSpacing: -0.5,
    },
    menuArrow: {
      color: theme.goldSoft,
      fontSize: 18,
    },
    menuClose: {
      marginTop: 8,
      justifyContent: "center",
    },
    menuCloseText: {
      color: theme.muted,
      fontSize: 14,
      textAlign: "center",
    },
  });
