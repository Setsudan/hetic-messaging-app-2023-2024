import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { pb } from '../../db/pocket';
import { router } from 'expo-router';
import authFormStyles from '../../styles/auth.styles';

interface RegisterData {
  username: string;
  email: string;
  emailVisibility: boolean;
  password: string;
  passwordConfirm: string;
  name: string;
}

const register = async (props: RegisterData) => {
  const record = await pb.collection('users').create(props);
  return { record };
};

export default function SignUpScreen() {
  const [identity, setidentity] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const handleRegister = async () => {
    const data: RegisterData = {
      username,
      email,
      emailVisibility: false,
      password,
      passwordConfirm,
      name,
    };

    const res = await register(data);

    if (res.record) {
      router.replace('/home');
    }
  };

  return (
    <View style={authFormStyles.container}>
      <Text style={authFormStyles.title}>Sign Up</Text>
      <TextInput
        style={authFormStyles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
        autoCapitalize="none"
      />
      <TextInput
        style={authFormStyles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        autoCapitalize="none"
      />
      <TextInput
        style={authFormStyles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TextInput
        style={authFormStyles.input}
        placeholder="Password Confirm"
        onChangeText={text => setPasswordConfirm(text)}
        value={passwordConfirm}
        secureTextEntry
      />
      <TextInput
        style={authFormStyles.input}
        placeholder="Name"
        onChangeText={text => setName(text)}
        value={name}
        autoCapitalize="none"
      />
      <TouchableOpacity style={authFormStyles.button} onPress={handleRegister}>
        <Text style={authFormStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={authFormStyles.divider} />
      <TouchableOpacity
        style={authFormStyles.secondaryButton}
        onPress={() => router.push('/auth/login')}
      >
        <Text style={authFormStyles.secondaryButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
