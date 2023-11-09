
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import { pb } from '../db/pocket';

export default function Home() {
    const [userAvatar, setUserAvatar] = React.useState('');
    const [userId, setUserId] = React.useState('');
    const [seeListOfUsers, setSeeListOfUsers] = React.useState(false);

    const [listOfUsers, setListOfUsers] = React.useState([]);

    const getListOfUsers = async () => {
        const users = await pb.collection('users').getFullList();
        setListOfUsers(users);
    };

    useEffect(() => {
        setUserAvatar(pb.authStore.model.avatar);
        setUserId(pb.authStore.model.id);
        getListOfUsers();
    }, []);

    return (
        <View style={styles.container}>
            <Image source={{
                uri: `https://091c-77-132-153-46.ngrok-free.app/api/files/_pb_users_auth_/${userId}/${userAvatar}`
            }} style={{ width: 100, height: 100 }} />
            <Text style={styles.title}>Home</Text>
            <Button title="See list of users" onPress={() => setSeeListOfUsers(!seeListOfUsers)} />
            {
                seeListOfUsers && (
                    <FlatList>
                        {
                            listOfUsers.map((user, index) => (
                                <View key={index}>
                                    <Image source={{
                                        uri: "https://091c-77-132-153-46.ngrok-free.app/api/files/_pb_users_auth_/86lb43o4qim11lj/" + user.avatar
                                    }} style={{ width: 100, height: 100 }} />
                                    <Text>{user.name}</Text>
                                </View>
                            ))
                        }
                    </FlatList>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
