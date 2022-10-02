import { createClient } from "@supabase/supabase-js";
import { supabaseCreds } from "../config-stage";

export const supabase = createClient(supabaseCreds.url, supabaseCreds.anonKey);

export const fetchHeaderItems = async () => {
  let { data, error } = await supabase
    .from("main_header_items")
    .select("label, link")
    .eq("active", "true")
    .order("rank", "asc");

  if (!error) {
    return data;
  } else {
    console.log(error);
    return [];
  }
};
