import React from "react";
import { Modal, View, Text, Pressable } from "react-native";

// Sesi 6 - Modal tipe Confirmation
// Styling pakai Tailwind (NativeWind) lewat className.
export default function ConfirmationModal({
  title,
  message,
  onPressConfirm,
  onPressCancel,
  ...modalProps
}) {
  return (
    <Modal
      transparent
      animationType="fade"
      onRequestClose={onPressCancel}
      {...modalProps}
    >
      {/* TODO: className latar: flex-1, isi di tengah, background gelap transparan */}
      <View className="">
        {/* TODO: className kotak: background paper (ingat dark:), padding, lebar */}
        <View className="">
          {/* TODO: title dan message pakai <Text> */}
          {/* TODO: tombol Batal (onPressCancel) dan Ya (onPressConfirm) pakai Pressable */}
        </View>
      </View>
    </Modal>
  );
}
