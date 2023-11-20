import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { login } from '../../common/auth';
import { pb } from '../../db/pocket';
import authFormStyles from '../../styles/auth.styles';
import { seed } from "../../seed";
export default function LoginScreen() {
  const [identity, setidentity] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await login(identity, password);
    setidentity('');
    setPassword('');

    if (res.record) {
      router.replace('/home');
    }
  };

  const fillForm = () => {
    // random user in seed
    const randomUser =
      seed[Math.floor(Math.random() * seed.length)];
    setidentity(randomUser.username);
    setPassword(randomUser.password);
  };

  useEffect(() => {
    if (pb.authStore.isValid) {
      router.replace('/home');
    }
  }, []);

  return (
    <View style={authFormStyles.container}>
      <TouchableOpacity onPress={() => fillForm()}>
        <Text style={authFormStyles.title}>Login</Text>
      </TouchableOpacity>
      <TextInput
        style={authFormStyles.input}
        placeholder="Identity"
        onChangeText={text => setidentity(text)}
        value={identity}
        autoCapitalize="none"
      />
      <TextInput
        style={authFormStyles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={authFormStyles.button} onPress={handleLogin}>
        <Text style={authFormStyles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={authFormStyles.divider} />
      <TouchableOpacity
        style={authFormStyles.secondaryButton}
        onPress={() => router.push('/auth/register')}
      >
        <Text style={authFormStyles.secondaryButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
