import { describe, it, expect } from 'vitest';
import { Seat } from '../types';

describe('Seat Dimensions Validation', () => {
  const validateDimensions = (seat: Partial<Seat>) => {
    const length = seat.seat_length || 1.0;
    const width = seat.seat_width || 1.0;
    const height = seat.seat_height || 1.0;
    
    return (
      length >= 0.5 && length <= 2.0 &&
      width >= 0.5 && width <= 2.0 &&
      height >= 0.3 && height <= 1.5
    );
  };

  it('should accept valid dimensions', () => {
    const seat: Partial<Seat> = { seat_length: 1.2, seat_width: 0.8, seat_height: 1.0 };
    expect(validateDimensions(seat)).toBe(true);
  });

  it('should reject out of range length', () => {
    expect(validateDimensions({ seat_length: 0.4 })).toBe(false);
    expect(validateDimensions({ seat_length: 2.1 })).toBe(false);
  });

  it('should reject out of range width', () => {
    expect(validateDimensions({ seat_width: 0.4 })).toBe(false);
    expect(validateDimensions({ seat_width: 2.1 })).toBe(false);
  });

  it('should reject out of range height', () => {
    expect(validateDimensions({ seat_height: 0.2 })).toBe(false);
    expect(validateDimensions({ seat_height: 1.6 })).toBe(false);
  });

  it('should use default values if dimensions are missing', () => {
    expect(validateDimensions({})).toBe(true); // Defaults to 1.0, which is valid
  });
});
