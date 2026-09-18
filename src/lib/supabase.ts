import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fhnvljrsbzwlsnpzdvle.supabase.co';
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_wRC772mtQa2enlgbA5mtTw_ViGKLvkR';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Check if Supabase client is configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseKey);
};
