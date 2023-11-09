
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { pb } from '../../db/pocket';
import { router } from 'expo-router';

const login = async (identity, password) => {
    const authData = await pb.collection('users').authWithPassword(
        identity,
        password,
    );

    if (authData) {
        router.replace('home');
    }
};

export default function LoginScreen() {
    const [identity, setidentity] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        login(identity, password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="identity"
                value={identity}
                onChangeText={setidentity}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 32,
    },
    input: {
        width: '80%',
        height: 48,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#1e90ff',
        borderRadius: 4,
        padding: 12,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
