import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, useColorScheme } from 'react-native';
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import  Auth  from '../components/Auth'
import Account from '../components/Account'
import { Text, View } from '../components/Themed';
import { Session } from '@supabase/supabase-js'

export default function ModalScreen() {
  const colorScheme = useColorScheme();
  const [session, setSession] = useState<Session|null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View style={styles.container}>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
      <div className={`rounded-md m-2 w-3/4 ${colorScheme && 'dark:text-gray-300'}`} style={{ padding: '50px 0 100px 0' }}>
              {!session ? <Auth /> : <Account key={session.user.id}  session={session} />}
      </div>
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
