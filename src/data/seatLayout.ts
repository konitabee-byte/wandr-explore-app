export type SeatStatus = "available" | "occupied" | "selected";

export interface Seat {
  id: string;
  label: string;
  /** Position in % of container width */
  x: number;
  /** Position in % of container height */
  y: number;
  status: SeatStatus;
}

export const SEAT_PRICE = 75000;

// Layout 14-seat Hiace (driver + 13 passenger).
// Coordinates tuned for the BASE_HIACE.png (top-down view, nose at top).
export const HIACE_SEATS: Seat[] = [
  // Row 1 — Front cabin (driver + front passenger)
  { id: "1A", label: "1A", x: 32, y: 14, status: "occupied" }, // driver
  { id: "1B", label: "1B", x: 68, y: 14, status: "available" },

  // Row 2 — 3 seats
  { id: "2A", label: "2A", x: 22, y: 32, status: "available" },
  { id: "2B", label: "2B", x: 50, y: 32, status: "occupied" },
  { id: "2C", label: "2C", x: 78, y: 32, status: "available" },

  // Row 3 — 3 seats
  { id: "3A", label: "3A", x: 22, y: 48, status: "available" },
  { id: "3B", label: "3B", x: 50, y: 48, status: "available" },
  { id: "3C", label: "3C", x: 78, y: 48, status: "occupied" },

  // Row 4 — 3 seats
  { id: "4A", label: "4A", x: 22, y: 64, status: "available" },
  { id: "4B", label: "4B", x: 50, y: 64, status: "available" },
  { id: "4C", label: "4C", x: 78, y: 64, status: "available" },

  // Row 5 — Rear bench (3 seats)
  { id: "5A", label: "5A", x: 22, y: 82, status: "available" },
  { id: "5B", label: "5B", x: 50, y: 82, status: "occupied" },
  { id: "5C", label: "5C", x: 78, y: 82, status: "available" },
];
