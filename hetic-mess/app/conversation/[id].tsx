import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
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
  const conversation = await pb
    .collection('conversations')
    .getOne(conversationId);
  const messages = conversation.messages;
  messages.push(messageId);
  await pb.collection('conversations').update(conversationId, { messages });
};

const getMessageContent = async messageId => {
  const message = await pb.collection('messages').getOne(messageId);
  return message;
};

const UserScreen = () => {
  const [messages, setMessages] = useState([]);
  const [conversationsMessages, setConversationsMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const scrollViewRef = useRef(null);

  const route = useRoute();
  const { id } = route.params as { id: string };

  const fetchConv = async () => {
    if (id) {
      const conv = await pb.collection('conversations').getOne(id);
      console.log(conv);
      setConversationsMessages(conv.messages);
    }
  };

  useEffect(() => {
    pb.collection('messages').subscribe('*', fetchConv);
  }, []);

  useEffect(() => {
    fetchConv();
  }, [id]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (conversationsMessages.length > 0) {
        const msgs = await Promise.all(
          conversationsMessages.map(getMessageContent),
        );
        setMessages(msgs);
      }
    };
    fetchMessages();
  }, [conversationsMessages]);

  const handleSendMessage = async () => {
    const res = await sendMessage({
      conversationId: id,
      sender: pb.authStore.model.id,
      content: msg,
    });
    setMsg('');
    setConversationsMessages([...conversationsMessages, res.id]);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.content}
        ref={scrollViewRef}
      >
        {messages ? (
          messages.map((message, index) => (
            <Text
              key={message.id}
              style={[
                styles.message,
                message.sender === pb.authStore.model.id
                  ? styles.sentMessage
                  : styles.receivedMessage,
                index === messages.length - 1 ? styles.lastMessage : null,
              ]}
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
          placeholder="Something fun to say..."
          style={styles.input}
          value={msg}
          onChangeText={text => setMsg(text)}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Text style={styles.sendButton}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  message: {
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5,
    maxWidth: '75%',
   
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  lastMessage: {
    marginBottom: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  content: {
    flex: 1,
    padding: 20,
    height: '100%',
    paddingBottom: 50,
  },
});

export default UserScreen;
