
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { pb } from '../../db/pocket';

const fileURI = "https://091c-77-132-153-46.ngrok-free.app/api/files/_pb_users_auth_/"

const getMessageById = async (id) => {
    const message = await pb.collection('messages').getOne(id);
    return message;
};

export default function UserScreen() {
    const [messages, setMessages] = useState([]);
    const [conversationsMessages, setConversationsMessages] = useState([]);
    const route = useRoute();
    const { id } = route.params;

    useEffect(() => {
        const fetchConv = async () => {
            if (id) {
                const conv = await pb.collection('conversations').getOne(id);
                setConversationsMessages(conv.messages);
            }
        };
        fetchConv();
    }, [id]);

    return (
        <View>
            <ScrollView>
                {
                    messages ? (
                        messages.map((message) => {
                            if (message.author === pb.authStore.model.id) {
                                return (
                                    <View key={message.id} style={styles.sentMessage}>
                                        <Text>{message.content}</Text>
                                    </View>
                                );
                            }
                            return (
                                <View key={message.id} style={styles.receivedMessage}>
                                    <Text>{message.content}</Text>
                                </View>
                            );
                        })
                    ) : (
                        <Text>Loading...</Text>
                    )
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    sentMessage: {
        textAlign: 'right',
        padding: 10,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
    },
    receivedMessage: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
});

