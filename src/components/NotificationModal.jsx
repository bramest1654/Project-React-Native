import React, { useEffect } from "react";
import { Modal, View, Text } from "react-native";

export default function NotificationModal({ visible, message, onHide }) {
  useEffect(() => {
  }, [visible]);

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onHide}
    >
      <View className="">
      </View>
    </Modal>
  );
}
