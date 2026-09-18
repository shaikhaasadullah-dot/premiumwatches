import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fhnvljrsbzwlsnpzdvle.supabase.co';
const supabaseKey = 'sb_publishable_wRC772mtQa2enlgbA5mtTw_ViGKLvkR';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log("Testing Supabase connection...");
  const { data, error } = await supabase.from('products').select('*').limit(5);
  if (error) {
    console.log("Supabase query error (expected if table does not exist yet):", error.message);
  } else {
    console.log("Products found in Supabase:", data?.length);
  }
}

test();
