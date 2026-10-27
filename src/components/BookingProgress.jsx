import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { useTheme } from "../navigation/AppNavigator";

/**
 * Progress bar booking — pakai library react-native-progress
 * karena React Native tidak punya progress bar bawaan.
 * Sesi 6: Measuring Progress
 */
export default function BookingProgress({ step, progress }) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={[styles.stepText, styles.stepActive]}>01 Detail</Text>
        <Text style={[styles.stepText, step === 2 && styles.stepActive]}>
          02 Review
        </Text>
      </View>
      <Progress.Bar
        progress={progress}
        width={null}
        height={6}
        borderRadius={3}
        color={theme.gold}
        unfilledColor={theme.line}
        borderWidth={0}
      />
      <Text style={styles.percent}>
        {step === 2
          ? "Data lengkap, tinggal konfirmasi"
          : `Form terisi ${Math.round(progress * 100)}%`}
      </Text>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: { marginBottom: 28, gap: 8 },
    labelRow: { flexDirection: "row", justifyContent: "space-between" },
    stepText: {
      color: theme.muted,
      fontSize: 10,
      fontWeight: "700",
      textTransform: "uppercase",
    },
    stepActive: { color: theme.text },
    percent: { color: theme.muted, fontSize: 11 },
  });
