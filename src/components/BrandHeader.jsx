import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  Modal,
} from "react-native";
import { useApp } from "../navigation/AppNavigator";

export default function BrandHeader({ navigation, title, showMenu = true }) {
  const { theme } = useApp();
  const styles = getStyles(theme);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Pengaturan", screen: "Settings" },
    { label: "Home", screen: "Home" },
    { label: "Layanan", screen: "Services" },
    { label: "Booking", screen: "Booking" },
    { label: "Status", screen: "Status" },
  ];

  function go(screen) {
    setMenuOpen(false);
    navigation.navigate(screen);
  }

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
      <View style={[StyleSheet.absoluteFill, styles.navBg]} />
      <View style={styles.shineLine} />

      <View style={styles.navInner}>
        {showMenu ? (
          <Pressable
            onPress={() => navigation.navigate("Home")}
            style={styles.brand}
          >
            {BrandContent}
          </Pressable>
        ) : (
          <View style={styles.brand}>{BrandContent}</View>
        )}

        {title ? <Text style={styles.pageTitle}>{title}</Text> : null}

        {showMenu && (
          <Pressable style={styles.menuButton} onPress={() => setMenuOpen(true)}>
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
              <View style={[StyleSheet.absoluteFill, styles.menuBg]} />
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
    navBg: {
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
    menuBg: { backgroundColor: "rgba(18,35,63,0.95)" },
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
