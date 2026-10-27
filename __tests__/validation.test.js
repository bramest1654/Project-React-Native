import { validateBookingForm } from '../src/utils/validation';

describe('Booking Form Validation', () => {
  const validForm = {
    name: 'Budi Santoso',
    phone: '081234567890',
    date: '2050-12-31',
    destination: 'Semarang',
    pickup: 'Stasiun Tawang',
    passengers: '2',
  };

  it('passes validation for valid form', () => {
    const result = validateBookingForm(validForm);
    expect(result.isValid).toBe(true);
    expect(Object.keys(result.errors).length).toBe(0);
  });

  it('fails if name is too short or empty', () => {
    const result = validateBookingForm({ ...validForm, name: 'A' });
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it('fails if phone number is invalid format', () => {
    const result = validateBookingForm({ ...validForm, phone: '024123456' });
    expect(result.isValid).toBe(false);
    expect(result.errors.phone).toBeDefined();
  });

  it('fails if date is in the past', () => {
    const result = validateBookingForm({ ...validForm, date: '2020-01-01' });
    expect(result.isValid).toBe(false);
    expect(result.errors.date).toBeDefined();
  });
});
