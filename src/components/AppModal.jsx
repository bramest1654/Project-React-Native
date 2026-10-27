import React, { useEffect } from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { useTheme } from "../navigation/AppNavigator";

/**
 * Reusable Modal — 3 tipe informasi sesuai materi Sesi 6 (Progress and Modal):
 * - "alert"        : hal penting terjadi, user harus menekan OK untuk menutup.
 * - "confirmation" : user harus memilih Batal / Ya sebelum aksi dijalankan.
 * - "notification" : info singkat, tidak memblokir, hilang sendiri.
 */
export default function AppModal({
  visible,
  type = "alert",
  title,
  message,
  confirmText = "Ya",
  cancelText = "Batal",
  onConfirm,
  onClose,
  duration = 2500,
}) {
  const theme = useTheme();
  const styles = getStyles(theme);

  // Notification menutup dirinya sendiri setelah `duration` ms
  useEffect(() => {
    if (visible && type === "notification") {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, type]);

  if (type === "notification") {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.notificationWrap} pointerEvents="box-none">
          <Pressable style={styles.notification} onPress={onClose}>
            <Text style={styles.notificationTitle}>{title}</Text>
            {message ? (
              <Text style={styles.notificationText}>{message}</Text>
            ) : null}
          </Pressable>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.box}>
          <Text
            style={[styles.eyebrow, type === "alert" && styles.eyebrowAlert]}
          >
            {type === "alert" ? "PERHATIAN" : "KONFIRMASI"}
          </Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.actions}>
            {type === "confirmation" && (
              <Pressable
                style={({ pressed }) => [
                  styles.outlineButton,
                  pressed && styles.pressed,
                ]}
                onPress={onClose}
              >
                <Text style={styles.outlineText}>{cancelText}</Text>
              </Pressable>
            )}
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.pressed,
              ]}
              onPress={type === "confirmation" ? onConfirm : onClose}
            >
              <Text style={styles.primaryText}>
                {type === "confirmation" ? confirmText : "OK"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.overlay,
      padding: 20,
    },
    box: {
      width: "100%",
      maxWidth: 400,
      backgroundColor: theme.paper,
      padding: 28,
      borderTopWidth: 3,
      borderTopColor: theme.gold,
    },
    eyebrow: {
      color: theme.gold,
      fontSize: 10,
      letterSpacing: 1.2,
      fontWeight: "700",
      marginBottom: 10,
    },
    eyebrowAlert: { color: theme.danger },
    title: {
      color: theme.text,
      fontSize: 22,
      fontWeight: "800",
      marginBottom: 8,
    },
    message: {
      color: theme.muted,
      fontSize: 13,
      lineHeight: 20,
      marginBottom: 24,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 12,
    },
    primaryButton: {
      backgroundColor: theme.navy,
      paddingVertical: 12,
      paddingHorizontal: 20,
    },
    primaryText: { color: theme.white, fontSize: 13, fontWeight: "800" },
    outlineButton: {
      borderWidth: 1,
      borderColor: theme.text,
      paddingVertical: 11,
      paddingHorizontal: 18,
    },
    outlineText: { color: theme.text, fontSize: 13, fontWeight: "800" },
    pressed: { opacity: 0.7 },
    notificationWrap: {
      flex: 1,
      justifyContent: "flex-start",
      paddingTop: 60,
      paddingHorizontal: 16,
    },
    notification: {
      backgroundColor: theme.navy,
      borderLeftWidth: 4,
      borderLeftColor: theme.gold,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 6,
    },
    notificationTitle: {
      color: theme.goldSoft,
      fontSize: 13,
      fontWeight: "800",
    },
    notificationText: {
      color: "#c7d0dd",
      fontSize: 12,
      marginTop: 4,
    },
  });
