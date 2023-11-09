
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
import { pb } from '../../db/pocket';
import { Link } from 'expo-router';

const fileURI = "https://091c-77-132-153-46.ngrok-free.app/api/files/_pb_users_auth_/"

export default function Home() {
    const [seeListOfUsers, setSeeListOfUsers] = React.useState(false);
    const [userId, setUserId] = React.useState('');
    const [listOfUsers, setListOfUsers] = React.useState([]);

    const getListOfUsers = async () => {
        const users = await pb.collection('users').getFullList();
        setListOfUsers(users);
    };

    useEffect(() => {
        setUserId(pb.authStore.model.id);
        getListOfUsers();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <Button title="See list of users" onPress={() => setSeeListOfUsers(!seeListOfUsers)} />
            {
                seeListOfUsers && (
                    <ScrollView>
                        {
                            // if user id is same as userId then don't show it
                            listOfUsers.map((user) => {
                                if (user.id !== userId) {
                                    return (
                                        <Link key={user.id} href={`/user/${user.id}`}>
                                            <Image source={{
                                                uri: `${fileURI}${user.id}/${user.avatar}`
                                            }} style={{ width: 100, height: 100 }} />
                                            <Text>{user.name}</Text>
                                        </Link>
                                    )
                                }
                            })
                        }
                    </ScrollView>
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
