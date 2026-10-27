import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Alert,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { BlurView } from "expo-blur";
import * as Location from "expo-location";
import BrandHeader from "../components/BrandHeader";
import LoadingState from "../components/LoadingState";
import { useApp } from "../navigation/AppNavigator";

/**
 * Location screen — MapView and expo-location.
 * Sesi 10: expo-location, MapView integration
 */

const { width, height } = Dimensions.get("window");

export default function LocationScreen({ navigation }) {
  const { theme } = useApp();
  const styles = getStyles(theme);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Automatically request location when screen mounts
  useEffect(() => {
    requestLocation();
  }, []);

  async function requestLocation() {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPermissionDenied(true);
        setLoading(false);
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      let lat = currentLocation.coords.latitude;
      let lon = currentLocation.coords.longitude;

      // DEMO MODE TWEAK: Jika terdeteksi di Cupertino (Apple Simulator Default),
      // otomatis pindahkan ke Semarang (Tugu Muda / Anterin HQ) agar relevan untuk presentasi.
      if (lat > 37 && lat < 38 && lon < -121 && lon > -123) {
        lat = -6.982926; // Semarang (Tugu Muda)
        lon = 110.409051;
      }

      setLocation({
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    } catch (err) {
      setErrorMsg("Gagal mendapatkan lokasi: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSetPickup() {
    // Kembali ke tab Booking sambil bawa koordinat lewat params.
    // Booking ada di dalam Tab Navigator ("MainTabs"), jadi pakai nested navigation.
    navigation.navigate("MainTabs", {
      screen: "Booking",
      params: { pickupCoord: location },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrap}>
        <BrandHeader navigation={navigation} title="LOKASI" />
      </View>

      {loading && (
        <View style={styles.loadingWrap}>
          <LoadingState message="Mendeteksi koordinat GPS..." />
        </View>
      )}

      {permissionDenied && (
        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>⚠️ Izin lokasi ditolak</Text>
          <Text style={styles.warningBody}>
            Aplikasi memerlukan izin lokasi untuk mendeteksi posisi Anda.
            Silakan aktifkan di pengaturan perangkat.
          </Text>
        </View>
      )}

      {errorMsg && (
        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>⚠️ Error</Text>
          <Text style={styles.warningBody}>{errorMsg}</Text>
        </View>
      )}

      {!loading && location && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={location}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Titik Jemput"
              description="Armada akan menjemput Anda di sini"
            >
              <View style={styles.customMarker}>
                <View style={styles.markerDot} />
              </View>
            </Marker>
          </MapView>

          <BlurView intensity={60} tint="light" style={styles.floatingPanel}>
            <Text style={styles.panelTitle}>Titik Penjemputan</Text>
            <Text style={styles.panelCoords}>
              {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.pressed,
              ]}
              onPress={handleSetPickup}
            >
              <Text style={styles.primaryText}>Gunakan lokasi ini →</Text>
            </Pressable>
          </BlurView>
        </View>
      )}
    </SafeAreaView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.paper },
    headerWrap: {
      paddingHorizontal: 22,
      paddingTop: 22,
      paddingBottom: 10,
      zIndex: 10,
    },
    loadingWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
    mapContainer: { flex: 1, position: "relative" },
    map: { width: width, height: height },
    customMarker: {
      backgroundColor: "rgba(0,0,0,0.1)",
      padding: 10,
      borderRadius: 20,
    },
    markerDot: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: theme.navy,
      borderWidth: 2,
      borderColor: theme.gold,
    },
    floatingPanel: {
      position: "absolute",
      bottom: 120,
      left: 22,
      right: 22,
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      padding: 20,
      borderRadius: 16,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.6)",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    panelTitle: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "800",
      marginBottom: 4,
    },
    panelCoords: { color: theme.muted, fontSize: 12, marginBottom: 16 },
    primaryButton: {
      backgroundColor: theme.navy,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: "center",
    },
    primaryText: { color: theme.white, fontSize: 13, fontWeight: "800" },
    pressed: { opacity: 0.7 },
    warningCard: {
      backgroundColor: "#fef3c7",
      padding: 18,
      margin: 22,
      borderLeftWidth: 3,
      borderLeftColor: "#d97706",
    },
    warningTitle: {
      color: "#92400e",
      fontSize: 14,
      fontWeight: "800",
      marginBottom: 6,
    },
    warningBody: { color: "#92400e", fontSize: 12, lineHeight: 18 },
  });
