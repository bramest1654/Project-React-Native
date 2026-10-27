import React, { useEffect } from "react";
import { Modal, View, Text } from "react-native";

// Sesi 6 - Modal tipe Notification, hilang sendiri
// Styling pakai Tailwind (NativeWind) lewat className.
export default function NotificationModal({ visible, message, onHide }) {
  useEffect(() => {
    // TODO: kalau visible, panggil onHide setelah 2-3 detik pakai setTimeout
    // TODO: return cleanup yang clearTimeout
  }, [visible]);

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onHide}
    >
      {/* TODO: className supaya isinya ada di bagian atas layar */}
      <View className="">
        {/* TODO: kotak notifikasi berisi <Text>{message}</Text>, kasih className */}
      </View>
    </Modal>
  );
}
