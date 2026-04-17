import { PassengerCount } from "./pricing";

export type ShuttleServiceTier = 'Regular' | 'Semi Executive' | 'Executive';

export type VehicleType = 'Mini Car' | 'SUV' | 'Hiace';

export interface PickupPoint {
  id: string;
  name: string;
  time: string;
  distance: number; // in meters (Mtr)
}

export interface Rayon {
  id: string;
  name: string; // e.g., "RAYON-A"
  destination: string; // e.g., "KNO"
  pickupPoints: PickupPoint[];
  basePrice: number;
}

export interface ShuttleSchedule {
  id: string;
  rayonId: string;
  departureTime: string;
}

export interface ShuttleService {
  tier: ShuttleServiceTier;
  amenities: string[];
  priceMultiplier: number;
}

export interface ShuttleVehicle {
  id: string;
  type: VehicleType;
  capacity: number;
  basePrice: number;
  layout_id?: string;
}

export interface ShuttleBookingState {
  step: number;
  selectedRayon: Rayon | null;
  selectedSchedule: ShuttleSchedule | null;
  selectedPickupPoint: PickupPoint | null;
  selectedService: ShuttleService | null;
  selectedVehicle: ShuttleVehicle | null;
  selectedSeats: string[];
  occupiedSeats: string[]; // Track seats booked by others
  currentLayout: any | null;
  passengerCounts: PassengerCount[];
  totalPrice: number;
  fareBreakdown: any | null; // Detailed calculation
  bookingStatus: 'draft' | 'validating' | 'confirmed' | 'paid' | 'completed';
  paymentMethod: string | null;
  ticketId: string | null;
  isRoundTrip: boolean;
  promoCode: string | null;
}
