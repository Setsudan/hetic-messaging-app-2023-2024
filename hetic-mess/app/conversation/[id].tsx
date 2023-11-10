
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { pb } from '../../db/pocket';

const fileURI = "https://091c-77-132-153-46.ngrok-free.app/api/files/_pb_users_auth_/"

const sendMessage = async ({ conversationId, sender, content }) => {
    const message = await pb.collection('messages').create({
        sender,
        content,
    });
    if (message.id) {
        await addMessageToConversation({ conversationId, messageId: message.id });
        return message;
    }
}

const addMessageToConversation = async ({ conversationId, messageId }) => {
    const conversation = await pb.collection('conversations').getOne(conversationId);
    const messages = conversation.messages;
    messages.push(messageId);
    await pb.collection('conversations').update(conversationId, { messages });
}

const getMessageContent = async (messageId) => {
    const message = await pb.collection('messages').getOne(messageId);
    return message;
}

export default function UserScreen() {
    const [messages, setMessages] = useState([]);
    const [conversationsMessages, setConversationsMessages] = useState([]);
    const [msg, setMsg] = useState('');

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

    useEffect(() => {
        const fetchMessages = async () => {
            if (conversationsMessages.length > 0) {
                const msgs = await Promise.all(conversationsMessages.map(getMessageContent));
                setMessages(msgs);
            }
        };
        fetchMessages();
    }, [conversationsMessages]);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ScrollView>
                    {
                        messages ? (
                            messages.map((message) => {
                                if (message.sender === pb.authStore.model.id) {
                                    return (
                                        <Text key={message.id} style={styles.sentMessage}>{message.content}</Text>
                                    );
                                }
                                return (
                                    <Text key={message.id} style={styles.receivedMessage}>{message.content}</Text>
                                );
                            })
                        ) : (
                            <Text>Loading...</Text>
                        )
                    }
                </ScrollView>
                <View style={styles.inputwrapper}>
                    <TextInput placeholder='Something fun to say...' style={styles.input} value={msg} onChangeText={(text) => setMsg(text)} />
                    <TouchableOpacity onPress={() =>
                        sendMessage({ conversationId: id, sender: pb.authStore.model.id, content: msg }).then((res) => {
                            setMsg('');
                            setConversationsMessages([...conversationsMessages, res.id]);
                        })
                    }>
                        <Text>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sentMessage: {
        textAlign: 'right',
        padding: 10,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        width: '100%',
        marginBottom: 10
    },
    receivedMessage: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        marginBottom: 10,
        textAlign: 'left',
        width: '100%',
        backgroundColor: '#f2f2f2',
    },
    inputwrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    navbar: {
        paddingTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f2f2f2',
        height: 100,
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    content: {
        flex: 1,
        padding: 20,
    },

    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    input: {
        width: '80%',
        height: 40,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        borderRadius: 20,
    },
});

