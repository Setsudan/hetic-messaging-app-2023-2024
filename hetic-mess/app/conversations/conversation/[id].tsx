import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';

import { pb } from '../../../db/pocket';
import { formatSentAt } from '../../../functions/conversations';
import conversationStyles from '../../../styles/conversations.styles';

const UserScreen = () => {
  // State variables
  const [messages, setMessages] = useState([]);
  const [conversationsMessages, setConversationsMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [conversations, setConversations] = useState();

  // Navigation
  const route = useRoute();
  // @ts-ignore
  const { id } = route.params;

  // Fetch conversation on component mount
  useEffect(() => {
    if (typeof id !== 'undefined') {
      fetchConv();
    } else {
      router.push('/home');
    }
  }, [id]);

  useEffect(() => {
    /*pb.collection('conversations').subscribe('*', async (e) => {
      await onRefresh();
    });*/
    // since real time doesn't work, we use this
    /*const interval = setInterval(() => {
      onRefresh();
    }, 1000);

    return () => clearInterval(interval);*/
  }, []);

  // Fetch conversation details
  const fetchConv = async () => {
    if (id) {
      const conv = await pb.collection('conversations').getOne(id);
      setConversationsMessages(conv?.messages || []);
      setConversations(conv);
    }
  };

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchConv();
    setRefreshing(false);
  };

  // Ref for ScrollView
  const scrollViewRef = useRef();

  // Scroll to the end of ScrollView
  const scrollToEnd = () =>
    scrollViewRef.current.scrollToEnd({ animated: true });

  // Fetch messages and set state
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
    scrollToEnd();

    // Ensure cleanup
    return () => pb.collection('messages').unsubscribe('*');
  }, [conversationsMessages]);

  // Fetch content of a message
  const getMessageContent = async messageId =>
    await pb.collection('messages').getOne(messageId);

  // Handle opening the media picker
  const handleOpenMediaPicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        // Update state with the selected image
        setFile(result.uri);
        setSelectedImage(result.uri);
      }
    } catch (error) {
      console.error('Error selecting media:', error);
    }
  };

  // Handle removing the attached image
  const handleRemoveImage = () => {
    setFile(null);
    setSelectedImage(null);
  };

  // Handle autoscrolling to the end of ScrollView
  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = async () => {
    if (msg || file) {
      const formData = new FormData();
      formData.append('content', msg);
      formData.append('conversationId', id);
      formData.append('sender', pb.authStore.model.id);
      if (file) {
        // If multimedia is attached, append it to the form data
        formData.append('multimedia', {
          uri: file,
          name: 'media',
          type: 'image/*',
        });
      }

      try {
        const message = await pb.collection('messages').create(formData);

        if (message.id) {
          const updatedMessages = [...conversationsMessages, message.id];
          setConversationsMessages(updatedMessages);

          const conversation = await pb.collection('conversations').getOne(id);
          const updatedConversation = {
            ...conversation,
            messages: updatedMessages,
          };
          await pb.collection('conversations').update(id, updatedConversation);

          // Reset input values
          setMsg('');
          setFile(null);
          setSelectedImage(null);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <View style={conversationStyles.container}>
      <View style={conversationStyles.header}>
        <TouchableOpacity
          style={conversationStyles.backButton}
          onPress={() => router.push('/home')}
        >
          <Text style={conversationStyles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {messages.length > 0 ? (
          messages.map(message => (
            <View
              key={message.id}
              style={
                message.sender === pb.authStore.model.id
                  ? conversationStyles.sentMessage
                  : conversationStyles.receivedMessage
              }
            >
              {message.multimedia && (
                <TouchableOpacity
                  onPress={() => router.push(`/media/${message.id}`)}
                >
                  <Image
                    source={{
                      uri: pb.files.getUrl(message, message.multimedia),
                    }}
                    style={conversationStyles.multimedia}
                  />
                </TouchableOpacity>
              )}
              <Text
                style={
                  message.sender === pb.authStore.model.id
                    ? conversationStyles.sentMessageText
                    : conversationStyles.receivedMessageText
                }
              >
                {message.content}
              </Text>
            </View>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
      <View style={conversationStyles.inputWrapper}>
        {/* Input field for messages */}
        <TextInput
          placeholder="Something fun to say..."
          style={conversationStyles.input}
          value={msg}
          onChangeText={text => setMsg(text)}
        />
        {/* Button to open multimedia picker */}
        <TouchableOpacity
          style={conversationStyles.button}
          onPress={handleOpenMediaPicker}
        >
          <Text style={conversationStyles.buttonText}>📎</Text>
        </TouchableOpacity>
        {/* Indicator and button to remove attached image */}
        {selectedImage && (
          <View>
            <Image
              source={{ uri: selectedImage }}
              style={{ width: 50, height: 50 }}
            />
            <TouchableOpacity
              style={conversationStyles.button}
              onPress={handleRemoveImage}
            >
              <Text style={conversationStyles.buttonText}>Remove Media</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Button to send messages */}
        <TouchableOpacity
          style={conversationStyles.button}
          onPress={handleSendMessage}
        >
          <Text style={conversationStyles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserScreen;
