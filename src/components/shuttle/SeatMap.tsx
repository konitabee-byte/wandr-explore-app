import { cn } from "@/lib/utils";
import hiaceLayout from "@/assets/hiace-layout.png";
import type { Seat } from "@/data/seatLayout";

interface SeatMapProps {
  seats: Seat[];
  selectedIds: string[];
  onToggle: (seatId: string) => void;
}

const SeatMap = ({ seats, selectedIds, onToggle }: SeatMapProps) => {
  return (
    <div className="relative w-full max-w-[280px] mx-auto aspect-[1/2] rounded-2xl overflow-hidden bg-muted/30 border">
      <img
        src={hiaceLayout}
        alt="Denah kursi shuttle Hiace"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        draggable={false}
      />

      {seats.map((seat) => {
        const isSelected = selectedIds.includes(seat.id);
        const isOccupied = seat.status === "occupied";
        const disabled = isOccupied;

        return (
          <button
            key={seat.id}
            type="button"
            disabled={disabled}
            onClick={() => onToggle(seat.id)}
            aria-label={`Kursi ${seat.label} ${
              isOccupied ? "terisi" : isSelected ? "terpilih" : "tersedia"
            }`}
            aria-pressed={isSelected}
            style={{
              left: `${seat.x}%`,
              top: `${seat.y}%`,
            }}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2",
              "w-9 h-9 rounded-lg border-2 text-[10px] font-bold",
              "flex items-center justify-center transition-all duration-150",
              "shadow-sm active:scale-90",
              isOccupied &&
                "bg-destructive/80 border-destructive text-destructive-foreground cursor-not-allowed opacity-70",
              !isOccupied &&
                !isSelected &&
                "bg-background border-primary/40 text-primary hover:bg-primary/10 hover:scale-105",
              isSelected &&
                "bg-primary border-primary text-primary-foreground scale-110 ring-2 ring-primary/30",
            )}
          >
            {seat.label}
          </button>
        );
      })}
    </div>
  );
};

export default SeatMap;
