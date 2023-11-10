
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { login } from '../../common/auth';
import { router } from 'expo-router';
import { pb } from '../../db/pocket';

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
        setidentity('johndoe');
        setPassword('UjA4KhU6c4seZuG');
    }

    useEffect(() => {
        if (pb.authStore.isValid) {
            router.replace('/home');
        }
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.title}
                onPress={() => fillForm()}
            >
                <Text style={styles.title}>Login</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Identity"
                onChangeText={(text) => setidentity(text)}
                value={identity}
                autoCapitalize='none'
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
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
        width: 150,
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
