import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
  Alert,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BrandHeader from "../components/BrandHeader";
import BookingField from "../components/BookingField";
import PriceSummary from "../components/PriceSummary";
import AvailabilityCard from "../components/AvailabilityCard";
import LoadingState from "../components/LoadingState";
import { useApp } from "../navigation/AppNavigator";
import { formatRupiah, calculateTotal } from "../utils/pricing";
import { validateBookingForm } from "../utils/validation";
import { createBookingObject, INITIAL_FORM } from "../utils/booking";
import { contactAdmin } from "../services/contactService";
import { submitBookingAPI } from "../services/api";

const DRAFT_KEY = "anterin-draft";

/**
 * Multi-step booking form with validation, review, confirmation modal.
 * Sesi 3: TextInput, Picker, DateTimePicker, validation
 * Sesi 4: Flexbox layout
 * Sesi 5: StyleSheet, design system
 * Sesi 6: Modal, ActivityIndicator, Alert
 * Sesi 7: Pressable with visual feedback
 * Sesi 9: AsyncStorage for draft persistence
 */
export default function BookingScreen({ navigation, route }) {
  const { theme } = useApp();
  const styles = getStyles(theme);
  const { packages, selectedPackage, setSelectedPackage, setBooking } =
    useApp();
  const [form, setForm] = useState(INITIAL_FORM);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [saving, setSaving] = useState(false);

  // Receive pickup location from Map
  useEffect(() => {
    if (route.params?.pickupCoord) {
      const coord = route.params.pickupCoord;
      updateField(
        "pickup",
        `${coord.latitude.toFixed(5)}, ${coord.longitude.toFixed(5)}`,
      );
    }
  }, [route.params?.pickupCoord]);

  // Load draft from AsyncStorage on mount
  useEffect(() => {
    AsyncStorage.getItem(DRAFT_KEY)
      .then((stored) => {
        if (stored) {
          const parsed = JSON.parse(stored);
          setForm((prev) => ({ ...prev, ...parsed }));
        }
      })
      .catch(() => {});
  }, []);

  // Save draft to AsyncStorage on form change
  useEffect(() => {
    const timeout = setTimeout(() => {
      AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(form)).catch(() => {});
    }, 500);
    return () => clearTimeout(timeout);
  }, [form]);

  const updateField = useCallback(
    (field, value) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [errors],
  );

  const total = calculateTotal(
    selectedPackage.price,
    form.extraHours,
    form.tripType,
  );

  function handleReview() {
    const result = validateBookingForm(form);
    if (!result.isValid) {
      setErrors(result.errors);
      Alert.alert(
        "Form belum lengkap",
        "Mohon lengkapi field yang ditandai merah.",
      );
      return;
    }
    setErrors({});
    setStep(2);
  }

  async function handleConfirm() {
    setSaving(true);
    const bookingObj = createBookingObject(form, selectedPackage, total);
    try {
      // API call (Mock or Real depending on env vars)
      await submitBookingAPI(bookingObj);

      // Get existing history & save to local storage
      const existing = await AsyncStorage.getItem("anterin-history");
      const history = existing ? JSON.parse(existing) : [];
      history.unshift(bookingObj);
      await AsyncStorage.setItem("anterin-history", JSON.stringify(history));

      setBooking(bookingObj);
      setConfirmedBooking(bookingObj);
      setModalOpen(true);
      await AsyncStorage.removeItem(DRAFT_KEY);
    } catch (err) {
      Alert.alert("Error", "Gagal mengirim booking ke server.");
    } finally {
      setSaving(false);
    }
  }

  function handleDateChange(event, selectedDate) {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().slice(0, 10);
      updateField("date", dateStr);
    }
  }

  function handleTimeChange(event, selectedDate) {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedDate) {
      const timeStr = selectedDate.toTimeString().slice(0, 5);
      updateField("time", timeStr);
    }
  }

  // --- Step 1: Form ---
  if (step === 1) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <BrandHeader navigation={navigation} title="BOOKING" />

          <Text style={styles.eyebrow}>JADWALKAN PERJALANAN</Text>
          <Text style={styles.pageTitle}>
            Booking yang{"\n"}
            <Text style={styles.goldText}>lebih mudah.</Text>
          </Text>

          {/* Progress indicator */}
          <View style={styles.stepper}>
            <View style={[styles.stepDot, styles.stepActive]} />
            <Text style={[styles.stepText, styles.stepActive]}>01 Detail</Text>
            <View style={styles.stepLine} />
            <View style={styles.stepDot} />
            <Text style={styles.stepText}>02 Review</Text>
          </View>

          {/* Package selector */}
          <Text style={styles.sectionLabel}>PILIH PAKET</Text>
          <View style={styles.miniPackageRow}>
            {packages.map((item) => (
              <Pressable
                key={item.id}
                style={[
                  styles.miniPackage,
                  selectedPackage.id === item.id && styles.miniPackageSelected,
                ]}
                onPress={() => setSelectedPackage(item)}
              >
                <Text
                  style={[
                    styles.miniPackageName,
                    selectedPackage.id === item.id && styles.whiteText,
                  ]}
                >
                  {item.name}
                </Text>
                <Text style={styles.miniPackagePrice}>
                  {formatRupiah(item.price)}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Form fields */}
          <Text style={styles.sectionLabel}>DETAIL PERJALANAN</Text>

          <BookingField
            label="Nama lengkap"
            value={form.name}
            onChangeText={(val) => updateField("name", val)}
            placeholder="Nama Anda"
            error={errors.name}
          />
          <BookingField
            label="Nomor HP"
            value={form.phone}
            onChangeText={(val) => updateField("phone", val)}
            placeholder="08xxxxxxxxxx"
            keyboardType="phone-pad"
            error={errors.phone}
          />

          {/* Date and Time picker */}
          <View style={styles.twoColumns}>
            <View style={styles.column}>
              <Text style={styles.inputLabel}>TANGGAL</Text>
              <Pressable
                style={[styles.dateButton, errors.date && styles.inputError]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text
                  style={form.date ? styles.dateText : styles.datePlaceholder}
                >
                  {form.date || "Pilih tanggal"}
                </Text>
              </Pressable>
              {errors.date ? (
                <Text style={styles.errorText}>{errors.date}</Text>
              ) : null}
              {showDatePicker && (
                <DateTimePicker
                  value={form.date ? new Date(form.date) : new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  minimumDate={new Date()}
                  onChange={handleDateChange}
                />
              )}
            </View>
            <View style={styles.column}>
              <Text style={styles.inputLabel}>WAKTU</Text>
              <Pressable
                style={[styles.dateButton]}
                onPress={() => setShowTimePicker(true)}
              >
                <Text
                  style={form.time ? styles.dateText : styles.datePlaceholder}
                >
                  {form.time || "08:00"}
                </Text>
              </Pressable>
              {showTimePicker && (
                <DateTimePicker
                  value={
                    form.date && form.time
                      ? new Date(form.date + "T" + form.time + ":00")
                      : new Date()
                  }
                  mode="time"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={handleTimeChange}
                />
              )}
            </View>
          </View>

          {/* Two-column: Passengers + Luggage */}
          <View style={styles.twoColumns}>
            <View style={styles.column}>
              <Text style={styles.inputLabel}>PENUMPANG</Text>
              <View style={styles.pickerWrap}>
                <Picker
                  selectedValue={form.passengers}
                  onValueChange={(val) => updateField("passengers", val)}
                  style={styles.picker}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <Picker.Item
                      key={n}
                      label={n + " orang"}
                      value={String(n)}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.column}>
              <Text style={styles.inputLabel}>KOPER</Text>
              <View style={styles.pickerWrap}>
                <Picker
                  selectedValue={form.luggage}
                  onValueChange={(val) => updateField("luggage", val)}
                  style={styles.picker}
                >
                  {[0, 1, 2, 3, 4].map((n) => (
                    <Picker.Item
                      key={n}
                      label={n + " koper"}
                      value={String(n)}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          {/* Two-column: Trip type + Extra hours */}
          <View style={styles.twoColumns}>
            <View style={styles.column}>
              <Text style={styles.inputLabel}>TIPE PERJALANAN</Text>
              <View style={styles.pickerWrap}>
                <Picker
                  selectedValue={form.tripType}
                  onValueChange={(val) => updateField("tripType", val)}
                  style={styles.picker}
                >
                  <Picker.Item label="Dalam kota" value="Dalam kota" />
                  <Picker.Item label="Luar kota" value="Luar kota" />
                </Picker>
              </View>
            </View>
            <View style={styles.column}>
              <Text style={styles.inputLabel}>EXTRA HOUR</Text>
              <View style={styles.pickerWrap}>
                <Picker
                  selectedValue={form.extraHours}
                  onValueChange={(val) => updateField("extraHours", val)}
                  style={styles.picker}
                >
                  <Picker.Item label="Tidak ada" value="0" />
                  <Picker.Item label="+ 1 jam" value="1" />
                  <Picker.Item label="+ 2 jam" value="2" />
                </Picker>
              </View>
            </View>
          </View>

          <BookingField
            label="Tujuan perjalanan"
            value={form.destination}
            onChangeText={(val) => updateField("destination", val)}
            placeholder="Contoh: Kota Lama Semarang"
            error={errors.destination}
          />
          <BookingField
            label="Titik penjemputan"
            value={form.pickup}
            onChangeText={(val) => updateField("pickup", val)}
            placeholder="Nama jalan, nomor bangunan, dan patokan lokasi"
            multiline
            error={errors.pickup}
          />
          <BookingField
            label="Catatan tambahan"
            value={form.notes}
            onChangeText={(val) => updateField("notes", val)}
            placeholder="Opsional: kebutuhan khusus, beberapa titik, dll."
            multiline
          />

          {/* Price summary */}
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>{selectedPackage.name}</Text>
            <PriceSummary
              basePrice={selectedPackage.price}
              extraHours={form.extraHours}
              tripType={form.tripType}
              total={total}
            />
            <Text style={styles.summaryNote}>
              Maks. 12 jam · Driver + BBM termasuk
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
            onPress={handleReview}
          >
            <Text style={styles.primaryText}>Review pesanan →</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // --- Step 2: Review ---
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <BrandHeader navigation={navigation} title="BOOKING" />

        <Text style={styles.eyebrow}>JADWALKAN PERJALANAN</Text>
        <Text style={styles.pageTitle}>
          Booking yang{"\n"}
          <Text style={styles.goldText}>lebih mudah.</Text>
        </Text>

        {/* Progress indicator */}
        <View style={styles.stepper}>
          <View style={[styles.stepDot, styles.stepActive]} />
          <Text style={[styles.stepText, styles.stepActive]}>01 Detail</Text>
          <View style={[styles.stepLine, styles.stepLineActive]} />
          <View style={[styles.stepDot, styles.stepActive]} />
          <Text style={[styles.stepText, styles.stepActive]}>02 Review</Text>
        </View>

        {/* Review card */}
        <View style={styles.reviewCard}>
          <Text style={styles.sectionLabel}>REVIEW PESANAN</Text>

          <View style={styles.reviewRow}>
            <Text style={styles.reviewLabel}>Paket layanan</Text>
            <Text style={styles.reviewValue}>{selectedPackage.name}</Text>
          </View>
          <View style={styles.reviewRow}>
            <Text style={styles.reviewLabel}>Jadwal</Text>
            <Text style={styles.reviewValue}>
              {form.date} · {form.time}
            </Text>
          </View>
          <View style={styles.reviewRow}>
            <Text style={styles.reviewLabel}>Rute</Text>
            <Text style={styles.reviewValue}>
              {form.pickup} → {form.destination}
            </Text>
          </View>
          <View style={styles.reviewRow}>
            <Text style={styles.reviewLabel}>Penumpang</Text>
            <Text style={styles.reviewValue}>
              {form.passengers} orang · {form.luggage} koper
            </Text>
          </View>
          {form.notes ? (
            <View style={styles.reviewRow}>
              <Text style={styles.reviewLabel}>Catatan</Text>
              <Text style={styles.reviewValue}>{form.notes}</Text>
            </View>
          ) : null}
        </View>

        <PriceSummary
          basePrice={selectedPackage.price}
          extraHours={form.extraHours}
          tripType={form.tripType}
          total={total}
        />

        <Text style={styles.consent}>
          Saya memahami harga belum termasuk tol dan parkir, serta booking
          menunggu konfirmasi admin.
        </Text>

        <View style={styles.reviewActions}>
          <Pressable
            onPress={() => setStep(1)}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Text style={styles.textButton}>← Ubah detail</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
            onPress={handleConfirm}
            disabled={saving}
          >
            {saving ? (
              <LoadingState message="Menyimpan..." />
            ) : (
              <Text style={styles.primaryText}>Konfirmasi booking →</Text>
            )}
          </Pressable>
        </View>

        {/* Sticky summary sidebar (scroll bottom) */}
        <View style={styles.stickySummary}>
          <Text style={styles.eyebrow}>RINGKASAN</Text>
          <Text style={styles.summaryTitle2}>{selectedPackage.name}</Text>
          <Text style={styles.summaryTotal}>{formatRupiah(total)}</Text>
          <Text style={styles.summaryNote2}>
            Maksimal 12 jam · Driver + BBM
          </Text>
          <AvailabilityCard date={form.date} />
        </View>
      </ScrollView>

      {/* Success modal */}
      <Modal
        visible={modalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setModalOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.successModal}>
            <Pressable
              style={styles.modalClose}
              onPress={() => setModalOpen(false)}
            >
              <Text style={styles.modalCloseText}>×</Text>
            </Pressable>

            <View style={styles.successIcon}>
              <Text style={styles.successIconText}>✓</Text>
            </View>

            <Text style={styles.eyebrow}>DRAFT BOOKING TERSIMPAN</Text>
            <Text style={styles.modalTitle}>Siap dikonfirmasi.</Text>
            <Text style={styles.modalBody}>
              Kode booking kamu{" "}
              <Text style={styles.boldText}>{confirmedBooking?.code}</Text>.
              Admin akan mengecek jadwal lalu menghubungi lewat Telepon/Email.
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                styles.waButton,
                pressed && styles.pressed,
              ]}
              onPress={() => {
                setModalOpen(false);
                if (confirmedBooking) contactAdmin();
              }}
            >
              <Text style={styles.primaryText}>Hubungi Admin ↗</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setModalOpen(false);
                navigation.navigate("Status");
              }}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Text style={styles.textButton}>Lihat status booking</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.paper },
    content: { padding: 22, paddingBottom: 110 },
    eyebrow: {
      color: theme.gold,
      fontSize: 10,
      letterSpacing: 1.2,
      fontWeight: "700",
      marginBottom: 12,
    },
    pageTitle: {
      color: theme.text,
      fontSize: 34,
      lineHeight: 38,
      fontWeight: "800",
      letterSpacing: -1.5,
      marginBottom: 20,
    },
    goldText: { color: theme.gold },
    stepper: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 28,
    },
    stepDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.line,
    },
    stepActive: { backgroundColor: theme.gold, color: theme.text },
    stepText: {
      color: theme.muted,
      fontSize: 10,
      fontWeight: "700",
      textTransform: "uppercase",
    },
    stepLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.line,
    },
    stepLineActive: { backgroundColor: theme.gold },
    sectionLabel: {
      color: theme.text,
      fontSize: 13,
      fontWeight: "800",
      marginTop: 7,
      marginBottom: 9,
    },
    miniPackageRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
    miniPackage: {
      flex: 1,
      padding: 12,
      borderWidth: 1,
      borderColor: theme.line,
      backgroundColor: theme.white,
      gap: 6,
    },
    miniPackageSelected: {
      borderColor: theme.gold,
      backgroundColor: theme.navy,
    },
    miniPackageName: {
      color: theme.text,
      fontSize: 11,
      fontWeight: "800",
    },
    miniPackagePrice: {
      color: theme.gold,
      fontSize: 10,
      fontWeight: "700",
    },
    whiteText: { color: theme.white },
    inputLabel: {
      color: theme.muted,
      fontSize: 10,
      fontWeight: "700",
      marginBottom: 6,
      marginTop: 10,
      textTransform: "uppercase",
      letterSpacing: 0.8,
    },
    dateButton: {
      minHeight: 46,
      borderWidth: 1,
      borderColor: theme.line,
      backgroundColor: theme.white,
      paddingHorizontal: 12,
      justifyContent: "center",
    },
    dateText: { color: theme.text, fontSize: 13 },
    datePlaceholder: { color: "#89909a", fontSize: 13 },
    inputError: { borderColor: theme.danger },
    errorText: {
      color: theme.danger,
      fontSize: 10,
      marginTop: 4,
      fontWeight: "600",
    },
    twoColumns: { flexDirection: "row", gap: 12 },
    column: { flex: 1 },
    pickerWrap: {
      borderWidth: 1,
      borderColor: theme.line,
      backgroundColor: theme.white,
      minHeight: 46,
      justifyContent: "center",
    },
    picker: { color: theme.text },
    summaryBox: {
      backgroundColor: theme.card,
      borderLeftWidth: 3,
      borderLeftColor: theme.gold,
      padding: 16,
      marginVertical: 18,
    },
    summaryTitle: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "800",
      marginBottom: 4,
    },
    summaryNote: { color: theme.muted, fontSize: 10, marginTop: 4 },
    primaryButton: {
      backgroundColor: theme.navy,
      paddingVertical: 15,
      paddingHorizontal: 18,
      alignSelf: "flex-start",
      marginTop: 8,
    },
    primaryText: { color: theme.white, fontSize: 13, fontWeight: "800" },
    pressed: { opacity: 0.7 },
    reviewCard: {
      backgroundColor: theme.card,
      padding: 20,
      gap: 14,
    },
    reviewRow: { gap: 4 },
    reviewLabel: { color: theme.muted, fontSize: 10, fontWeight: "700" },
    reviewValue: { color: theme.text, fontSize: 14, fontWeight: "600" },
    consent: {
      color: theme.muted,
      fontSize: 11,
      lineHeight: 17,
      marginVertical: 16,
    },
    reviewActions: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      flexWrap: "wrap",
    },
    textButton: {
      color: theme.text,
      fontSize: 12,
      fontWeight: "800",
      paddingVertical: 8,
    },
    boldText: { color: theme.text, fontWeight: "800" },
    stickySummary: {
      backgroundColor: theme.navy,
      padding: 22,
      marginTop: 30,
    },
    summaryTitle2: {
      color: theme.white,
      fontSize: 18,
      fontWeight: "800",
      marginBottom: 4,
    },
    summaryTotal: {
      color: theme.goldSoft,
      fontSize: 15,
      fontWeight: "800",
      marginBottom: 4,
    },
    summaryNote2: { color: "#c7d0dd", fontSize: 11 },
    // Modal
    modalBackdrop: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.overlay,
      padding: 20,
    },
    successModal: {
      width: "100%",
      maxWidth: 400,
      backgroundColor: theme.paper,
      padding: 32,
      alignItems: "center",
    },
    modalClose: { position: "absolute", top: 12, right: 15 },
    modalCloseText: { fontSize: 24, color: theme.text },
    successIcon: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: theme.gold,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    successIconText: { color: theme.text, fontWeight: "800", fontSize: 18 },
    modalTitle: {
      color: theme.text,
      fontSize: 28,
      fontWeight: "800",
      textAlign: "center",
      marginBottom: 12,
    },
    modalBody: {
      color: theme.muted,
      fontSize: 13,
      lineHeight: 20,
      textAlign: "center",
      marginBottom: 24,
    },
    waButton: { alignSelf: "center", marginBottom: 12 },
  });
