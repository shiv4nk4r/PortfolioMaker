import { createClient } from "@supabase/supabase-js";
import { supabaseCreds } from "../config-stage";

export const supabase = createClient(supabaseCreds.url, supabaseCreds.anonKey);

/**
 * Function fetch the header items from DB
 * @returns
 */
export async function fetchHeaderItems() {
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
}

export async function fetchFeaturesList() {
  let { data, error } = await supabase
    .from("main_features_items")
    .select("title, icon, description")
    .eq("active", "true")
    .order("rank", "asc");

  if (!error) {
    return data;
  } else {
    console.log(error);
    return [];
  }
}
