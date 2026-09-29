/**
 * Anterin form validation
 * Sesi 3: Input validation logic
 */

export function validateBookingForm(form) {
  const errors = {};

  if (!form.name || form.name.trim().length < 2) {
    errors.name = "Nama lengkap wajib diisi (minimal 2 karakter).";
  }

  if (!form.phone || !/^08\d{8,12}$/.test(form.phone.trim())) {
    errors.phone = "Nomor HP harus diawali 08 (10-14 digit).";
  }

  if (!form.date) {
    errors.date = "Tanggal penjemputan wajib dipilih.";
  } else {
    const selected = new Date(form.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      errors.date = "Tanggal tidak boleh kurang dari hari ini.";
    }
  }

  if (!form.destination || form.destination.trim().length < 3) {
    errors.destination = "Tujuan perjalanan wajib diisi.";
  }

  if (!form.pickup || form.pickup.trim().length < 5) {
    errors.pickup = "Titik penjemputan wajib diisi dengan detail yang jelas.";
  }

  const passengers = parseInt(form.passengers, 10);
  if (isNaN(passengers) || passengers < 1 || passengers > 6) {
    errors.passengers = "Jumlah penumpang harus 1-6 orang.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
