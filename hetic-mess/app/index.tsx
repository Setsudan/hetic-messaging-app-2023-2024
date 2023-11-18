import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { pb } from '../db/pocket';
import { router } from 'expo-router';

const isLoggedIn = async () => {
  try {
    const authData = await pb.authStore.isValid;
    return authData;
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

// if logged in redirect to home else redirect to login

export default function App() {
  const [isLogged, setIsLogged] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const res = await isLoggedIn();
      setIsLogged(res);
    })();
  }, []);

  useEffect(() => {
    if (isLogged === true) {
      router.replace('/home');
    } else if (isLogged === false) {
      router.replace('/auth/login');
    }
  }, [isLogged]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Loading ...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
