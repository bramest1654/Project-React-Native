import { generateBookingCode, createBookingObject, INITIAL_FORM } from '../src/utils/booking';

describe('Booking Utilities', () => {
  it('generates booking code starting with ANT-', () => {
    const code = generateBookingCode();
    expect(code.startsWith('ANT-')).toBe(true);
    expect(code.length).toBeGreaterThan(6);
  });

  it('creates complete booking object', () => {
    const mockPackage = { id: 'test', name: 'Test Package' };
    const booking = createBookingObject(INITIAL_FORM, mockPackage, 1500000);
    
    expect(booking.packageId).toBe('test');
    expect(booking.packageName).toBe('Test Package');
    expect(booking.total).toBe(1500000);
    expect(booking.status).toBe('pending');
    expect(booking.code).toBeDefined();
    expect(booking.createdAt).toBeDefined();
    // Inherits form fields
    expect(booking.time).toBe('08:00');
  });
});
