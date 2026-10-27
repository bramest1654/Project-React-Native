import React from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { useApp } from "../navigation/AppNavigator";

/**
 * Driver profile card with liquid glass styling.
 * Shows photo, name, rating, badge, bio, and skill tags.
 */
export default function DriverCard({ driver }) {
  const { theme } = useApp();
  const styles = getStyles(theme);
  const stars = Math.round(driver.rating);

  return (
    <View style={styles.card}>
      {/* Glass blur layer */}
      {Platform.OS === "ios" && (
        <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
      )}
      <View style={styles.topShine} />

      <View style={styles.inner}>
        {/* Photo + badge */}
        <View style={styles.photoWrap}>
          <Image
            source={driver.photo}
            style={styles.photo}
            resizeMode="cover"
          />
          <View style={styles.badgePill}>
            <Text style={styles.badgeText}>{driver.badge}</Text>
          </View>
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.name}>{driver.name}</Text>
          <Text style={styles.tagline}>{driver.tagline}</Text>

          {/* Rating row */}
          <View style={styles.ratingRow}>
            <Text style={styles.stars}>{"★".repeat(stars)}</Text>
            <Text style={styles.ratingNum}>{driver.rating}</Text>
            <Text style={styles.trips}> · {driver.trips} trip</Text>
          </View>

          <Text style={styles.bio}>{driver.bio}</Text>

          {/* Skill tags */}
          <View style={styles.skillRow}>
            {driver.skills.map((skill) => (
              <View key={skill} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.exp}>{driver.experience} pengalaman</Text>
        </View>
      </View>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    card: {
      marginBottom: 16,
      borderRadius: 20,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.45)",
      backgroundColor: "rgba(255,255,255,0.55)",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.08,
      shadowRadius: 18,
      elevation: 4,
    },
    topShine: {
      height: 1,
      backgroundColor: "rgba(255,255,255,0.75)",
      marginHorizontal: 16,
      marginTop: 1,
    },
    inner: {
      flexDirection: "row",
      padding: 16,
      gap: 14,
    },
    photoWrap: {
      position: "relative",
    },
    photo: {
      width: 90,
      height: 110,
      borderRadius: 14,
    },
    badgePill: {
      position: "absolute",
      bottom: -6,
      left: 0,
      right: 0,
      alignItems: "center",
    },
    badgePillInner: {
      backgroundColor: theme.navy,
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderRadius: 6,
    },
    badgeText: {
      color: theme.gold,
      fontSize: 8,
      fontWeight: "800",
      letterSpacing: 0.8,
      backgroundColor: theme.navy,
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderRadius: 6,
      overflow: "hidden",
    },
    info: {
      flex: 1,
      gap: 4,
    },
    name: {
      color: theme.text,
      fontSize: 15,
      fontWeight: "800",
      letterSpacing: -0.3,
    },
    tagline: {
      color: theme.gold,
      fontSize: 11,
      fontWeight: "700",
    },
    ratingRow: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 4,
    },
    stars: {
      color: theme.gold,
      fontSize: 12,
    },
    ratingNum: {
      color: theme.text,
      fontSize: 12,
      fontWeight: "800",
      marginLeft: 4,
    },
    trips: {
      color: theme.muted,
      fontSize: 11,
    },
    bio: {
      color: theme.muted,
      fontSize: 11,
      lineHeight: 16,
    },
    skillRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 5,
      marginTop: 6,
    },
    skillTag: {
      borderWidth: 1,
      borderColor: "rgba(18,35,63,0.15)",
      borderRadius: 6,
      paddingHorizontal: 7,
      paddingVertical: 3,
      backgroundColor: "rgba(18,35,63,0.05)",
    },
    skillText: {
      color: theme.text,
      fontSize: 9,
      fontWeight: "700",
    },
    exp: {
      color: theme.muted,
      fontSize: 10,
      marginTop: 4,
    },
  });
