import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'
import * as SecureStore from "expo-secure-store";


const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
      return SecureStore.getItemAsync(key)
    },
    setItem: (key: string, value: string) => {
      SecureStore.setItemAsync(key, value)
    },
    removeItem: (key: string) => {
      SecureStore.deleteItemAsync(key)
    },
}
  
const supabaseUrl = 'https://vahcarqyxsxxipnjlwzc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhaGNhcnF5eHN4eGlwbmpsd3pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4NTEwNjEsImV4cCI6MjAwOTQyNzA2MX0.y5fcCBuTMxDmZVEnIiFeTdvH9GtHwbWOVYtBtKnWKCs'
  
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})