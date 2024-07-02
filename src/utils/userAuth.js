import insertDemoData from "./insertDemoData";
import { createClient } from "./supabase/client";

const supabase = createClient();

export const googleAuthLogin = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: "google",
  });
};

export const getUserSession = async () => {
  return await supabase.auth.getSession();
};

export const getUser = async () => {
  return await supabase.auth.getUser();
};

export const userSignOut = async () => {
  return await supabase.auth.signOut();
};
