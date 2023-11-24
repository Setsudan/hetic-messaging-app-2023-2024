import React, { useRef, useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';

import { router } from 'expo-router';
import authFormStyles from '../../styles/auth.styles';
import { register, RegisterData } from "../../common/auth";

const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');

export default function SignUpScreen() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
    const [error, setError] = useState('');

  const handleRegister = async () => {
      // check if all fields are filled
        if (!username || !password || !passwordConfirm || !name) {
            setError('Please fill in all fields');
            return;
        }

        // check if password and password confirm are the same
        if (password !== passwordConfirm) {
            setError('Passwords do not match');
            return;
        }

        // password regex
        if (!passwordRegex.test(password)) {
            setError('Password must contain at least 8 characters, 1 uppercase, 1 lowercase and 1 number');
            return;
        }

    const data: RegisterData = {
      username,
      email: '', // empty cause we don't have OTP set up
      emailVisibility: false,
      password,
      passwordConfirm,
      name,
    };

    const res = await register(data);

    if (res.record) {
      router.replace('/auth/login');
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
        <Text style={authFormStyles.error}>{error}</Text>
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
