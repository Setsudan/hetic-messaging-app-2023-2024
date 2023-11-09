import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { pb } from '../db/pocket';
import { useEffect, useState } from 'react';
import LoginScreen from '../components/auth/login';
import Home from './home';

const isLoggedIn = async () => {
    const authData = await pb.authStore.isValid();
    return authData;
}

// if logged in redirect to home else redirect to login

export default function App() {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        isLoggedIn().then((res) => {
            setIsLogged(res);
        });
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {
                isLogged ? <Home /> : <LoginScreen />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

