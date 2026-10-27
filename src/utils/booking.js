/**
 * Anterin booking utilities
 * Sesi 1-2: Pure functions for booking operations
 */

export function generateBookingCode() {
  const timestamp = Date.now().toString().slice(-6);
  return "ANT-" + timestamp;
}

export function createBookingObject(form, selectedPackage, total) {
  return {
    ...form,
    packageId: selectedPackage.id,
    packageName: selectedPackage.name,
    total,
    code: generateBookingCode(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
}

export const INITIAL_FORM = {
  name: "",
  phone: "",
  date: "",
  time: "08:00",
  destination: "",
  pickup: "",
  passengers: "2",
  luggage: "1",
  tripType: "Dalam kota",
  extraHours: "0",
  notes: "",
};
