import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Avatar } from '@ui-kitten/components';
import { UserData } from '@/types/API/auth.types';

type ProfileProps = {
    userData: UserData;
    onSave: (userData: UserData) => void;
};

const Profile = () => {
    const [userData, setUserData] = useState<UserData>();

    useEffect(() => {
        // Code pour récupérer les données de l'utilisateur
    }, []);

    const handleEditProfilePicture = () => {
        console.log('handleEditProfilePicture');
        // Code pour modifier la photo de profil
    }

    const handleChange = (label: string, value: string) => {
        setUserData({
            ...userData,
            [label]: value,
        });
    };

    const handleSave = () => {
        if (!userData) return;
        onSave(userData);
    };

    const onSave = (userData: UserData) => {
        console.log('onSave', userData);
        // Code pour enregistrer les données de l'utilisateur
    }

    return (
        <View style={styles.container}>
            <Avatar style={styles.avatar} source={require( '../../assets/icon.png' )} />
            <Button
                style={styles.button}
                onPress={() => handleEditProfilePicture()}
            >
                Modifier la photo de profil
            </Button>
            <Input
                style={styles.input}
                label="Nom d'affichage"
                placeholder="Entrez votre nom d'affichage"
                value={userData?.display_name || ''}
                onChangeText={(value) => handleChange('display_name', value)}
            />
            <Input
                style={styles.input}
                label="Nom d'utilisateur"
                placeholder="Entrez votre nom d'utilisateur"
                value={userData?.username || ''}
                onChangeText={(value) => handleChange('username', value)}
            />
            <Input
                style={styles.input}
                label="Mot de passe"
                placeholder="Entrez votre mot de passe"
                value={userData?.password || ''}
                onChangeText={(value) => handleChange('password', value)}
                secureTextEntry
            />
            <Input
                style={styles.input}
                label="Numéro de téléphone"
                placeholder="Entrez votre numéro de téléphone"
                value={userData?.phone_number || ''}
                onChangeText={(value) => handleChange('phone_number', value)}
            />
            <Input
                style={styles.input}
                label="Adresse e-mail"
                placeholder="Entrez votre adresse e-mail"
                value={userData?.email || ''}
                onChangeText={(value) => handleChange('email', value)}
            />
            <Input
                style={styles.input}
                label="À propos de moi"
                placeholder="Entrez une description"
                value={userData?.about || ''}
                onChangeText={(value) => handleChange('about', value)}
                multiline
            />
            <Button style={styles.button} onPress={handleSave}>
                Enregistrer
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        height: '100%',
    },
    avatar: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginVertical: 10,
    },
});

export default Profile;
