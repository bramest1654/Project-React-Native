import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useApp } from "../navigation/AppNavigator";
import { checkAvailability } from "../services/availabilityService";
import LoadingState from "./LoadingState";

/**
 * Mock availability calendar widget.
 * Sesi 11: Fetch simulation with loading/error states
 */
const DAY_NAMES = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

export default function AvailabilityCard({ date }) {
  const { theme } = useApp();
  const styles = getStyles(theme);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    checkAvailability(date)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [date]);

  if (loading) return <LoadingState message="Mengecek ketersediaan..." />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Ketersediaan estimasi</Text>
        <Text style={styles.headerDate}>{date || "Pilih tanggal"}</Text>
      </View>
      <View style={styles.daysRow}>
        {DAY_NAMES.map((day, index) => {
          const available = data ? data[index] : true;
          return (
            <View
              key={day}
              style={[styles.dayCell, !available && styles.occupied]}
            >
              <Text style={styles.dayName}>{day}</Text>
              <Text
                style={[styles.dayNumber, available && styles.availableText]}
              >
                {index + 12}
              </Text>
              <Text
                style={[styles.dayStatus, available && styles.availableText]}
              >
                {available ? "✓" : "—"}
              </Text>
            </View>
          );
        })}
      </View>
      <Text style={styles.disclaimer}>
        Slot real-time akan dikonfirmasi admin melalui Telepon/Email.
      </Text>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: "rgba(255,255,255,0.15)",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    headerLabel: {
      color: "#c7d0dd",
      fontSize: 10,
    },
    headerDate: {
      color: theme.goldSoft,
      fontSize: 10,
      fontWeight: "700",
    },
    daysRow: {
      flexDirection: "row",
      gap: 4,
    },
    dayCell: {
      flex: 1,
      alignItems: "center",
      gap: 4,
      paddingVertical: 7,
    },
    occupied: {
      opacity: 0.4,
    },
    dayName: {
      color: "#c7d0dd",
      fontSize: 8,
    },
    dayNumber: {
      color: theme.white,
      fontSize: 12,
      fontWeight: "800",
    },
    dayStatus: {
      color: "#c7d0dd",
      fontSize: 7,
    },
    availableText: {
      color: theme.goldSoft,
    },
    disclaimer: {
      color: "#c7d0dd",
      fontSize: 9,
      lineHeight: 14,
      marginTop: 12,
    },
    errorText: {
      color: theme.danger,
      fontSize: 11,
      marginTop: 12,
    },
  });
