
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { pb } from '../../db/pocket';
import { router } from 'expo-router';

const login = async (identity, password) => {
    try {
        const authData = await pb.collection('users').authWithPassword(
            identity,
            password,
        );

        if (authData) {
            router.replace('home');
        }
    } catch (error) {
        console.error("An error occurred during login:", error);
    }
};


export default function LoginScreen() {
    const [identity, setidentity] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        login(identity, password);
        setidentity('');
        setPassword('');
    };

    const fillForm = () => {
        setidentity('hellosandie');
        setPassword('6BKEkVZHi25ASKy');
    }

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
                capitalize="none"
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
