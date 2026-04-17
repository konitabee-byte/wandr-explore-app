import { supabase } from '@/lib/supabase';
import { SeatLayout, Seat, SeatCategory, ApiResponse, LayoutHistory } from '../types';

/**
 * Seat Layout Service - Admin module
 * Handles all operations for visual seat layout management
 */
export const seatLayoutService = {
  // --- Layouts ---
  async getLayouts() {
    return await supabase
      .from('seat_layouts')
      .select('*, seats(*)')
      .order('updated_at', { ascending: false });
  },

  async getLayoutById(id: string) {
    return await supabase
      .from('seat_layouts')
      .select('*, seats(*, category:seat_categories(*))')
      .eq('id', id)
      .single();
  },

  async createLayout(layout: Partial<SeatLayout>) {
    return await supabase
      .from('seat_layouts')
      .insert([layout])
      .select()
      .single();
  },

  async updateLayout(id: string, updates: Partial<SeatLayout>) {
    return await supabase
      .from('seat_layouts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  },

  async deleteLayout(id: string) {
    return await supabase
      .from('seat_layouts')
      .delete()
      .eq('id', id);
  },

  // --- Seats ---
  async saveSeats(layoutId: string, seats: Partial<Seat>[]) {
    // 1. Delete existing seats for this layout
    const { error: deleteError } = await supabase
      .from('seats')
      .delete()
      .eq('layout_id', layoutId);
    
    if (deleteError) {
      console.error('[SeatLayoutService] Error deleting seats:', deleteError);
      return { error: deleteError };
    }

    if (seats.length === 0) return { data: [] };

    // 2. Insert new seats
    // Ensure all seats have the correct layout_id and remove potential non-db fields
    const cleanedSeats = seats.map(s => {
      const { 
        category, 
        created_at, 
        updated_at, 
        ...seatData 
      } = s as any;

      // Ensure UUID fields are not empty strings
      if (seatData.category_id === '') delete seatData.category_id;
      
      return { 
        ...seatData, 
        layout_id: layoutId 
      };
    });

    console.log('[SeatLayoutService] Inserting cleaned seats:', cleanedSeats);

    const { data, error: insertError } = await supabase
      .from('seats')
      .insert(cleanedSeats)
      .select();
    
    if (insertError) {
      console.error('[SeatLayoutService] Error inserting seats:', insertError);
      return { error: insertError };
    }

    return { data };
  },

  // --- Categories ---
  async getCategories() {
    return await supabase
      .from('seat_categories')
      .select('*')
      .order('name');
  },

  async createCategory(category: Partial<SeatCategory>) {
    return await supabase
      .from('seat_categories')
      .insert([category])
      .select()
      .single();
  },

  // --- History ---
  async logHistory(history: Partial<LayoutHistory>) {
    return await supabase
      .from('layout_history')
      .insert([history]);
  },

  async getHistory(layoutId: string) {
    return await supabase
      .from('layout_history')
      .select('*')
      .eq('layout_id', layoutId)
      .order('created_at', { ascending: false });
  }
};
