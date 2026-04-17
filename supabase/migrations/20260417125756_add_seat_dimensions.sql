-- Add dimensions columns to seats table
ALTER TABLE public.seats 
ADD COLUMN IF NOT EXISTS seat_length DECIMAL(4,2) DEFAULT 1.0, -- meters
ADD COLUMN IF NOT EXISTS seat_width DECIMAL(4,2) DEFAULT 1.0,  -- meters
ADD COLUMN IF NOT EXISTS seat_height DECIMAL(4,2) DEFAULT 1.0; -- meters

-- Add constraint for realistic dimensions
ALTER TABLE public.seats 
ADD CONSTRAINT seat_length_range CHECK (seat_length >= 0.5 AND seat_length <= 2.0),
ADD CONSTRAINT seat_width_range CHECK (seat_width >= 0.5 AND seat_width <= 2.0),
ADD CONSTRAINT seat_height_range CHECK (seat_height >= 0.3 AND seat_height <= 1.5);

-- Update existing seats with default values if needed
UPDATE public.seats SET seat_length = 1.0, seat_width = 1.0, seat_height = 1.0 WHERE seat_length IS NULL;
