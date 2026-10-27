import React from "react";
import { View, Text } from "react-native";
import * as Progress from "react-native-progress";
import { useTheme } from "../navigation/AppNavigator";

// Sesi 6 - Measuring Progress
// Styling pakai Tailwind (NativeWind) lewat className.
// Progress.Bar komponen library, gak ngerti className, jadi warnanya lewat props.
export default function ProgressBar({ progress }) {
  const theme = useTheme();

  // TODO: isi className di View dan Text pakai class Tailwind
  return (
    <View className="">
      {/* TODO: <Text> persentase, Math.round(progress * 100) + "%" */}
      {/* TODO: <Progress.Bar> pakai progress, width, dan color theme.gold */}
    </View>
  );
}
