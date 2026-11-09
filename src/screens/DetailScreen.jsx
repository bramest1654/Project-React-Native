import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet, SafeAreaView } from "react-native";
import packages from "../data/packages";
import theme from "../theme/colors";
import { formatRupiah } from "../utils/pricing";

export default function DetailScreen({ navigation, route }) {
  const styles = getStyles(theme);
  const packageId = route.params?.packageId;
  const pkg = packages.find((p) => p.id === packageId) || packages[0];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text>{pkg.label}</Text>
        <Text>{pkg.name}</Text>
        <Text>{formatRupiah(pkg.price)}</Text>
        <Text>{pkg.description}</Text>
                         {pkg.features.map((f) => (
          <Text key={f}>✦ {f}</Text>
        ))}
                <Pressable
          onPress={() =>
            navigation.navigate("MainTabs", {
              screen: "Booking",
              params: { packageId: pkg.id },
            })
          }
        >
          <Text>Pesan paket ini</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.paper },
    content: { padding: 24 },
  });