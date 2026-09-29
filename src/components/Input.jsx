import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from "../navigation/AppNavigator";

/**
 * Reusable Input komponen — pola dari materi "Collecting Data".
 * Menerima semua props TextInput (termasuk secureTextEntry, onChangeText, dll.)
 * dan menampilkan label di atasnya.
 */
function Input(props) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.textInputContainer}>
      <Text style={styles.textInputLabel}>{props.label}</Text>
      <TextInput
        style={styles.textInput}
        placeholderTextColor={theme.muted}
        {...props}
      />
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    textInputContainer: {
      marginBottom: 16,
    },
    textInputLabel: {
      color: theme.text,
      fontSize: 12,
      fontWeight: "700",
      letterSpacing: 0.8,
      marginBottom: 8,
      textTransform: "uppercase",
    },
    textInput: {
      backgroundColor: theme.isDark
        ? "rgba(255,255,255,0.07)"
        : "rgba(18,35,63,0.05)",
      borderWidth: 1,
      borderColor: theme.isDark
        ? "rgba(255,255,255,0.15)"
        : "rgba(18,35,63,0.12)",
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 15,
      color: theme.text,
    },
  });

export default Input;
