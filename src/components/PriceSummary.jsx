import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useApp } from "../navigation/AppNavigator";
import {
  formatRupiah,
  calculateExtraHours,
  calculateTripSurcharge,
} from "../utils/pricing";

export default function PriceSummary({
  basePrice,
  extraHours,
  tripType,
  total,
}) {
  const { theme } = useApp();
  const styles = getStyles(theme);
  const extra = calculateExtraHours(extraHours);
  const surcharge = calculateTripSurcharge(tripType);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Harga paket</Text>
        <Text style={styles.value}>{formatRupiah(basePrice)}</Text>
      </View>
      {extra > 0 && (
        <View style={styles.row}>
          <Text style={styles.label}>Extra hour (×{extraHours})</Text>
          <Text style={styles.value}>{formatRupiah(extra)}</Text>
        </View>
      )}
      {surcharge > 0 && (
        <View style={styles.row}>
          <Text style={styles.label}>Tambahan luar kota</Text>
          <Text style={styles.value}>{formatRupiah(surcharge)}</Text>
        </View>
      )}
      <View style={[styles.row, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total estimasi</Text>
        <Text style={styles.totalValue}>{formatRupiah(total)}</Text>
      </View>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      gap: 10,
      paddingVertical: 16,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    label: {
      color: theme.muted,
      fontSize: 12,
    },
    value: {
      color: theme.text,
      fontSize: 12,
      fontWeight: "700",
    },
    totalRow: {
      borderTopWidth: 1,
      borderTopColor: theme.line,
      paddingTop: 12,
      marginTop: 4,
    },
    totalLabel: {
      color: theme.text,
      fontSize: 14,
      fontWeight: "800",
    },
    totalValue: {
      color: theme.gold,
      fontSize: 14,
      fontWeight: "800",
    },
  });
