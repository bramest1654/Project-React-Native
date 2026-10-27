import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Platform,
  Animated,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { useApp } from "../navigation/AppNavigator";

const { width } = Dimensions.get("window");

const DOCK_ICONS = {
  Home: "⌂",
  Booking: "◎",
  Status: "◷",
};

function DockItem({ item, active, onPress, styles, theme }) {
  const scale = useRef(new Animated.Value(1)).current;

  function handlePress() {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.82,
        useNativeDriver: true,
        speed: 50,
      }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20 }),
    ]).start();
    onPress();
  }

  return (
    <Pressable onPress={handlePress} style={styles.dockItem}>
      <Animated.View style={[styles.iconWrap, { transform: [{ scale }] }]}>
        <Text style={[styles.icon, active && styles.iconActive]}>
          {item.icon}
        </Text>
      </Animated.View>
      <Text style={[styles.label, active && styles.labelActive]}>
        {item.label}
      </Text>
    </Pressable>
  );
}

export default function GlassDock({ state, descriptors, navigation }) {
  const { theme } = useApp();
  const styles = getStyles(theme);

  const mountAnim = useRef(new Animated.Value(80)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(state.index)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(mountAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 10,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: state.index,
      useNativeDriver: true,
      tension: 60,
      friction: 10,
    }).start();
  }, [state.index]);

  // Math for bubble position
  const pillWidth = width - 48;
  const innerWidth = pillWidth - 16; // accounting for paddingHorizontal: 8
  const segment = innerWidth / 3;
  // Center of each segment is at: segment / 2
  // Bubble is 44px wide, so offset by -22
  const pos0 = 8 + segment / 2 - 22;
  const pos1 = 8 + segment + segment / 2 - 22;
  const pos2 = 8 + segment * 2 + segment / 2 - 22;

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [pos0, pos1, pos2],
  });

  return (
    <Animated.View
      style={[
        styles.dockWrapper,
        { transform: [{ translateY: mountAnim }], opacity: opacityAnim },
      ]}
    >
      <View style={styles.dockPill}>
        {Platform.OS === "ios" ? (
          <BlurView
            intensity={80}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
        ) : (
          <View style={[StyleSheet.absoluteFill, styles.androidBg]} />
        )}
        <View style={styles.topShine} />

        {/* Floating Bubble Background */}
        <Animated.View style={[styles.bubble, { transform: [{ translateX }] }]}>
          {Platform.OS === "ios" && (
            <BlurView
              intensity={50}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
          )}
          <View style={styles.shineSmall} />
        </Animated.View>

        <View style={styles.dockRow}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;
            const isFocused = state.index === index;
            const icon = DOCK_ICONS[route.name] || "•";

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <DockItem
                key={route.key}
                item={{ label, icon }}
                active={isFocused}
                onPress={onPress}
                styles={styles}
                theme={theme}
              />
            );
          })}
        </View>
      </View>
    </Animated.View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    dockWrapper: {
      position: "absolute",
      bottom: Platform.OS === "ios" ? 34 : 20,
      left: 0,
      right: 0,
      alignItems: "center",
      zIndex: 999,
      pointerEvents: "box-none",
    },
    dockPill: {
      borderRadius: 32,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.45)",
      backgroundColor: "rgba(255,255,255,0.10)",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.18,
      shadowRadius: 30,
      elevation: 20,
      width: width - 48,
      position: "relative",
    },
    topShine: {
      height: 1,
      backgroundColor: "rgba(255,255,255,0.7)",
      marginHorizontal: 20,
      marginTop: 1,
    },
    androidBg: {
      backgroundColor: "rgba(255,255,255,0.88)",
    },
    bubble: {
      position: "absolute",
      top: 10,
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: theme.navy,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.2)",
      shadowColor: theme.navy,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      overflow: "hidden",
      zIndex: 1,
    },
    dockRow: {
      flexDirection: "row",
      paddingVertical: 10,
      paddingHorizontal: 8,
      alignItems: "center",
      zIndex: 2,
    },
    dockItem: {
      flex: 1,
      alignItems: "center",
      gap: 4,
    },
    iconWrap: {
      width: 44,
      height: 44,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
    },
    shineSmall: {
      position: "absolute",
      top: 1,
      left: 6,
      right: 6,
      height: 1,
      backgroundColor: "rgba(255,255,255,0.4)",
      zIndex: 1,
    },
    icon: {
      fontSize: 18,
      color: theme.muted,
      zIndex: 2,
    },
    iconActive: {
      color: theme.gold,
    },
    label: {
      fontSize: 9,
      fontWeight: "700",
      color: theme.muted,
      letterSpacing: 0.3,
    },
    labelActive: {
      color: theme.text,
      fontWeight: "800",
    },
  });
