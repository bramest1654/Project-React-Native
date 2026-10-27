import React from "react";
import { Modal, View, Text, Pressable } from "react-native";

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
      <View className="">
        <View className="">
        </View>
      </View>
    </Modal>
  );
}
