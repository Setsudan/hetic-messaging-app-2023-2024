
import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { pb } from '../../db/pocket';

const fileURI = "https://091c-77-132-153-46.ngrok-free.app/api/files/_pb_users_auth_/"

export default function UserScreen() {
    const [user, setUser] = useState({
        avatar: '',
        collectionId: '',
        collectionName: '',
        created: '',
        emailVisibility: false,
        id: '',
        name: '',
        updated: '',
        username: '',
        verified: false,
    });
    const route = useRoute();
    const { id } = route.params;

    useEffect(() => {
        const fetchUser = async () => {
            const userRef = await pb.collection('users').getOne(id);
            setUser(userRef);
        };
        fetchUser();
    }, [id]);

    return (
        <View>
            {user ? (
                <View>
                    <Image source={{ uri: `${fileURI}${user.id}/${user.avatar}` }} style={{ width: 100, height: 100 }} />
                    <Text>{user.name}</Text>
                    <Text>{user.username}</Text>
                    <Text>{
                        user.emailVisibility ? 'Email visible' : 'Email not visible'
                    }
                    </Text>
                    <Text>
                        {
                            user.verified ? 'Verified' : 'Not verified'
                        }
                    </Text>
                </View>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
}
