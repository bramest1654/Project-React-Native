const EXTRA_HOUR_RATE = 100000;
const OUT_OF_CITY_SURCHARGE = 150000;

export function formatRupiah(value) {
  return "Rp " + Number(value).toLocaleString("id-ID");
}

export function calculateExtraHours(hours) {
  const parsed = parseInt(hours, 10) || 0;
  return parsed * EXTRA_HOUR_RATE;
}

export function calculateTripSurcharge(tripType) {
  return tripType === "Luar kota" ? OUT_OF_CITY_SURCHARGE : 0;
}

export function calculateTotal(basePrice, extraHours, tripType) {
  const extra = calculateExtraHours(extraHours);
  const surcharge = calculateTripSurcharge(tripType);
  return basePrice + extra + surcharge;
}

export { EXTRA_HOUR_RATE, OUT_OF_CITY_SURCHARGE };
