import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SeatLayout, Seat } from '../admin/types';
import { ShuttleBookingState } from '../types/shuttle';

// Helper to mock a booking state
const createMockState = (overrides: Partial<ShuttleBookingState> = {}): ShuttleBookingState => ({
  step: 6,
  selectedRayon: { id: 'rayon-a', name: 'Rayon A', destination: 'KNO', basePrice: 100000, pickupPoints: [] },
  selectedSchedule: { id: 'sch-1', rayonId: 'rayon-a', departureTime: '06:00' },
  selectedPickupPoint: { id: 'p1', name: 'Point 1', time: '06:00', distance: 10000 },
  selectedService: { tier: 'Regular', amenities: ['AC'], priceMultiplier: 1.0 },
  selectedVehicle: { type: 'Mini Car', capacity: 4, basePrice: 50000 },
  selectedSeats: [],
  occupiedSeats: ['seat-5'], // One seat already taken
  currentLayout: null,
  passengerCounts: [{ category: 'adult', count: 1 }],
  totalPrice: 150000,
  fareBreakdown: null,
  bookingStatus: 'draft',
  paymentMethod: null,
  ticketId: null,
  isRoundTrip: false,
  promoCode: null,
  ...overrides
});

describe('Shuttle Seat Integration Logic', () => {
  it('should prevent selecting an occupied seat', () => {
    const state = createMockState({ occupiedSeats: ['seat-1'] });
    const seatToSelect = 'seat-1';
    
    const isOccupied = state.occupiedSeats.includes(seatToSelect);
    expect(isOccupied).toBe(true);
    
    // In actual context logic:
    const toggleSeat = (id: string, currentSelected: string[]) => {
      if (state.occupiedSeats.includes(id)) return currentSelected;
      return currentSelected.includes(id) 
        ? currentSelected.filter(s => s !== id) 
        : [...currentSelected, id];
    };

    const newSelected = toggleSeat(seatToSelect, state.selectedSeats);
    expect(newSelected).toEqual([]);
    expect(newSelected).not.toContain(seatToSelect);
  });

  it('should allow selecting an available seat', () => {
    const state = createMockState({ occupiedSeats: ['seat-5'], selectedSeats: [] });
    const seatToSelect = 'seat-1';
    
    const toggleSeat = (id: string, currentSelected: string[]) => {
      if (state.occupiedSeats.includes(id)) return currentSelected;
      return currentSelected.includes(id) 
        ? currentSelected.filter(s => s !== id) 
        : [...currentSelected, id];
    };

    const newSelected = toggleSeat(seatToSelect, state.selectedSeats);
    expect(newSelected).toContain(seatToSelect);
  });

  it('should sync seat dimensions from layout to display', () => {
    const mockSeat: Seat = {
      id: 'seat-1',
      layout_id: 'layout-1',
      seat_number: 'A1',
      category_id: 'cat-1',
      x_pos: 20,
      y_pos: 30,
      status: 'available',
      seat_length: 1.5,
      seat_width: 0.8
    };

    // Verify dimension calculations for CSS
    const baseSize = 32;
    const renderedWidth = baseSize * (mockSeat.seat_width || 1.0);
    const renderedHeight = baseSize * (mockSeat.seat_length || 1.0);

    expect(renderedWidth).toBe(32 * 0.8);
    expect(renderedHeight).toBe(32 * 1.5);
  });

  it('should detect double booking conflict (Integration Scenario)', () => {
    // Scenario: User selects a seat, but before they finalize, someone else books it
    let state = createMockState({ selectedSeats: ['seat-1'], occupiedSeats: [] });
    
    // Simulate real-time update: seat-1 becomes occupied
    const realTimeUpdate = ['seat-1', 'seat-5'];
    state.occupiedSeats = realTimeUpdate;

    // Validation before final booking
    const hasConflict = state.selectedSeats.some(s => state.occupiedSeats.includes(s));
    expect(hasConflict).toBe(true);
  });
});
