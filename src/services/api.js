import { Alert } from "react-native";

/**
 * Anterin Network Service
 * Sesi 11: Communicate with Servers
 *
 * Architecture:
 * - Menggunakan standar REST API.
 * - Disiapkan untuk Supabase PostgREST (BaaS).
 * - Dilengkapi Fallback (Mock) jika environment variables belum diset,
 *   sehingga aplikasi tidak crash saat demo tanpa internet/backend.
 */

// TODO: Ganti dengan URL & Key Supabase asli saat siap deploy
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

const isMockMode = !SUPABASE_URL || !SUPABASE_ANON_KEY;

export async function submitBookingAPI(bookingData) {
  if (isMockMode) {
    console.log(
      "[API MOCK] Mengirim data booking ke server...",
      bookingData.code,
    );
    // Simulasi delay jaringan (1.5 detik)
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("[API MOCK] Booking berhasil diterima server.");
        resolve({ success: true, data: bookingData });
      }, 1500);
    });
  }

  // HTTP POST (Real Network Request)
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("[API ERROR] Gagal mengirim booking:", error);
    throw error;
  }
}
