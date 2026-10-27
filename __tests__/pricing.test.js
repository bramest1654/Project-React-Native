import {
  calculateExtraHours,
  calculateTripSurcharge,
  calculateTotal,
  formatRupiah,
} from '../src/utils/pricing';

describe('Pricing calculations', () => {
  it('calculates extra hours correctly', () => {
    expect(calculateExtraHours('0')).toBe(0);
    expect(calculateExtraHours('1')).toBe(100000);
    expect(calculateExtraHours('2')).toBe(200000);
  });

  it('calculates trip surcharge correctly', () => {
    expect(calculateTripSurcharge('Dalam kota')).toBe(0);
    expect(calculateTripSurcharge('Luar kota')).toBe(150000);
  });

  it('calculates total correctly', () => {
    // Base: 1,000,000, Extra: 1 (100k), Trip: Luar kota (150k) = 1,250,000
    expect(calculateTotal(1000000, '1', 'Luar kota')).toBe(1250000);
    
    // Base: 1,250,000, Extra: 0, Trip: Dalam kota = 1,250,000
    expect(calculateTotal(1250000, '0', 'Dalam kota')).toBe(1250000);
  });

  it('formats Rupiah correctly', () => {
    expect(formatRupiah(1000000)).toBe('Rp 1.000.000');
    expect(formatRupiah(0)).toBe('Rp 0');
  });
});
