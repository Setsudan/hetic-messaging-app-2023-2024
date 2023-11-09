
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
import { pb } from '../db/pocket';
import { Link } from 'expo-router';

const fileURI = "https://091c-77-132-153-46.ngrok-free.app/api/files/_pb_users_auth_/"

const getUserById = async (id) => {
    const user = await pb.collection('users').getOne(id);
    return user.username;
};

export default function Home() {
    const [fetchedConversations, setFetchedConversations] = React.useState([]);
    const [shownConversations, setShownConversations] = React.useState([]);

    const getConversations = async () => {
        const records = await pb.collection('conversations').getFullList({
            sort: '-created',
        });
        setFetchedConversations(records);
        console.log(fetchedConversations);
        fetchedConversations.map(async (conversation) => {
            conversation.participants.map(async (participant) => {
                const username = await getUserById(participant);
                console.log(`user ${participant} is ${username} in conversation ${conversation.id}`);
            });
        });
    };

    useEffect(() => {
        setFetchedConversations([]);
        getConversations();
    }, []);

    useEffect(() => {
        const participantsUsername = [];
        // shownConversations is almost the same as conversations except we only keep the participants usernames, and the conversation id
        fetchedConversations.map(async (conversation) => {
            // only if in the participants we have the current user id
            if (conversation.participants.includes(pb.authStore.model.id)) {
                // we modify the conversations structure by addind participantsUsername to it so we can display it on the home page
                conversation.participants.map(async (participant) => {
                    if (participant !== pb.authStore.model.id) {
                        await participantsUsername.push(await getUserById(participant));
                    }
                }
                );
                setShownConversations([...shownConversations, { id: conversation.id, participantsUsername }]);
            }
        }
        );
    }
        , [fetchedConversations]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home</Text>
            <Button title="refresh" onPress={() => getConversations()} />
            <ScrollView>
                {
                    shownConversations.map((conversation) => {
                        return (
                            <Link
                                style={styles.conversation}
                                key={conversation.id} href={`/conversation/${conversation.id}`}>
                                <Text>{
                                    conversation.participantsUsername.map((username) => {
                                        return `${username} `;
                                    })
                                }</Text>
                            </Link>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
    conversation: {
        height: 50,
        width: 300,
        backgroundColor: '#ccc',
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
});