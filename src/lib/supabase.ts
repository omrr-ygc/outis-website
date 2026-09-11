import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
const supabaseUrl = rawUrl.startsWith("http")
  ? rawUrl
  : "https://whwztxdzpghsgejguiye.supabase.co";

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "dummy-key-for-build";

export const supabase = createClient(supabaseUrl, supabaseServiceKey);