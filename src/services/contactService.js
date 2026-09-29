import { Linking, Alert } from "react-native";

const ADMIN_PHONE = "+6281226089112";
const ADMIN_EMAIL = "bramasthanarendra@gmail.com";

export function contactAdmin() {
  Alert.alert(
    "Hubungi Admin",
    "Pilih metode untuk menghubungi admin:",
    [
      { text: "Telepon", onPress: () => Linking.openURL(`tel:${ADMIN_PHONE}`) },
      { text: "Email", onPress: () => Linking.openURL(`mailto:${ADMIN_EMAIL}`) },
      { text: "Batal", style: "cancel" },
    ]
  );
}
