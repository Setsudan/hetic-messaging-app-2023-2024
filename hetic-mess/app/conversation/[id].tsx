import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { pb } from '../../db/pocket';

const sendMessage = async ({ conversationId, sender, content }) => {
  const message = await pb.collection('messages').create({
    sender,
    content,
  });

  if (message.id) {
    await addMessageToConversation({ conversationId, messageId: message.id });
    return message;
  }
};

const addMessageToConversation = async ({ conversationId, messageId }) => {
  const conversation = await pb.collection('conversations').getOne(conversationId);
  const messages = conversation.messages;
  messages.push(messageId);
  await pb.collection('conversations').update(conversationId, { messages });
};

const getMessageContent = async (messageId) => {
  const message = await pb.collection('messages').getOne(messageId);
  return message;
};

const UserScreen = () => {
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

  const isCurrentUser = pb.authStore.model.id === id;

  const handleSendMessage = async () => {
    const res = await sendMessage({ conversationId: id, sender: pb.authStore.model.id, content: msg });
    setMsg('');
    setConversationsMessages([...conversationsMessages, res.id]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {messages.length > 0 ? (
          messages.map((message) => (
            <Text
              key={message.id}
              style={[styles.message, message.sender === pb.authStore.model.id ? styles.sentMessage : styles.receivedMessage]}
            >
              {message.content}
            </Text>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder='Something fun to say...'
          style={styles.input}
          value={msg}
          onChangeText={(text) => setMsg(text)}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Text style={styles.sendButton}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    padding: 10,
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 10,
  },
  sentMessage: {
    textAlign: 'right',
    borderBottomColor: '#f2f2f2',
  },
  receivedMessage: {
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
  },
  inputWrapper: {
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
  content: {
    flex: 1,
    padding: 20,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButton: {
    color: 'blue', // Customize the color as needed
  },
});

export default UserScreen;