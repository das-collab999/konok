import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Подключение к базе (шаг 3 техзадания).
 *
 * Пока ключи не заданы, сайт работает на тестовых данных из `src/data/`.
 * Как только в окружении появятся NEXT_PUBLIC_SUPABASE_URL и
 * NEXT_PUBLIC_SUPABASE_ANON_KEY, те же страницы начнут брать данные из базы.
 * Инструкция — в README, раздел «Шаг 3: база данных».
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

export function supabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
  }
  return client;
}
