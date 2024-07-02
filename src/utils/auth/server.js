import { createClient } from "@/utils/supabase/server";
// import { createClient as createServerClient } from "./supabase/server";

const supabase = createClient();

export const getUserSession = async () => {
  return await supabase.auth.getSession();
};

export const getUser = async () => {
  return await supabase.auth.getUser();
};
