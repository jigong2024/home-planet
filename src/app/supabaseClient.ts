import { createClient } from "@supabase/supabase-js";

// 1) project url
const SUPABASE_PROJECT_URL = "https://zpoqlmaetyjwslleswlh.supabase.co";

// 2) anon key
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwb3FsbWFldHlqd3NsbGVzd2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2MTA5NjAsImV4cCI6MjA0NDE4Njk2MH0.EOyg-xaUSbDwozpIBmZdq0d_pWhvcHlJI8oBAvA8-7Y";

// Supabase 클라이언트 생성
export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);
