import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useApp } from "../navigation/AppNavigator";

export default function BookingField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  multiline,
  error,
}) {
  const { theme } = useApp();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          error && styles.inputError,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#89909a"
        keyboardType={keyboardType}
        multiline={multiline}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 4,
    },
    label: {
      color: theme.muted,
      fontSize: 10,
      fontWeight: "700",
      marginBottom: 6,
      marginTop: 10,
      textTransform: "uppercase",
      letterSpacing: 0.8,
    },
    input: {
      minHeight: 46,
      borderWidth: 1,
      borderColor: theme.line,
      backgroundColor: theme.white,
      paddingHorizontal: 12,
      color: theme.text,
      fontSize: 13,
    },
    multiline: {
      minHeight: 80,
      paddingTop: 12,
      textAlignVertical: "top",
    },
    inputError: {
      borderColor: theme.danger,
    },
    errorText: {
      color: theme.danger,
      fontSize: 10,
      marginTop: 4,
      fontWeight: "600",
    },
  });
