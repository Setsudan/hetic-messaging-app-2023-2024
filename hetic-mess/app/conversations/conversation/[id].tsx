import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import { Video } from "expo-av";

import { pb } from '../../../db/pocket';
import { formatSentAt } from '../../../functions/conversations';
import conversationStyles from '../../../styles/conversations.styles';

const IMAGE_EXTENSIONS = ['jpg', 'png', 'gif', 'webp', 'avif'];
const VIDEO_EXTENSIONS = ['mp4', 'mpeg', 'webm', 'avi'];
const AUDIO_EXTENSIONS = ['mp3', 'wav', 'ogg'];

const UserScreen = () => {
  const [messages, setMessages] = useState([]);
  const [conversationsMessages, setConversationsMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [conversations, setConversations] = useState();
  const [loading, setLoading] = useState(true);
  const [convId, setConvId] = useState('');

  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    if (id) {
      fetchConv().finally(() => setLoading(false));
    } else {
      router.push('/home');
    }
    setConvId(id);
  }, [id]);

  const fetchConv = useCallback(async () => {
    try {
      const conv = await pb.collection('conversations').getOne(id);
      setConversationsMessages(conv?.messages || []);
      setConversations(conv);
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }

    console.log('id',id);
  }, [id]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchConv();
    setRefreshing(false);
  }, [fetchConv]);

  const scrollViewRef = useRef();

  const scrollToEnd = useCallback(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, []);

  const fetchMessages = useCallback(async () => {
    if (conversationsMessages.length > 0) {
      try {
        const msgs = await Promise.all(
            conversationsMessages.map(getMessageContent),
        );
        setMessages(msgs);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  }, [conversationsMessages]);

  useEffect(() => {
    fetchMessages();
    scrollToEnd();
  }, [fetchMessages, scrollToEnd]);

  const getMessageContent = useCallback(async messageId => {
    try {
      return await pb.collection('messages').getOne(messageId);
    } catch (error) {
      console.error('Error fetching message content:', error);
      return null;
    }
  }, []);

  const handleOpenMediaPicker = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setFile(result.uri);
        setSelectedImage(result.uri);
      }
    } catch (error) {
      console.error('Error selecting media:', error);
    }
  }, []);

  const handleRemoveImage = useCallback(() => {
    setFile(null);
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    scrollToEnd();
  }, [messages, scrollToEnd]);

  const handleSendMessage = useCallback(async () => {
    if (msg || file) {
      const formData = new FormData();
      formData.append('content', msg);
      formData.append('conversationId', convId);
      console.log('pb.authStore.model.id',pb.authStore.model?.id)
      formData.append('sender', pb.authStore.model.id);
      if (file) {
        const uriParts = file.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('multimedia', {
          uri: file,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      console.log('formData',formData);

      try {
        console.log('Tryin to send message');
        const message = await pb.collection('messages').create(formData);
        console.log('Message sent',message);
        if (message.id) {
          console.log('Message sent',message);
          const updatedMessages = [...conversationsMessages, message.id];
          setConversationsMessages(updatedMessages);
          setMsg('');
          setFile(null);
          setSelectedImage(null);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }, [msg, file, id, conversationsMessages]);

  const getMediaType = useCallback((fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (IMAGE_EXTENSIONS.includes(ext)) {
      return 'image';
    } else if (VIDEO_EXTENSIONS.includes(ext)) {
      return 'video';
    } else if (AUDIO_EXTENSIONS.includes(ext)) {
      return 'audio';
    }
    return 'file';
  }, []);

  const renderMessage = useCallback((message) => {
    const isSentByCurrentUser = message.sender === pb.authStore.model.id;
    const messageType = getMediaType(message.multimedia);

    return (
        <View
            key={message.id}
            style={
              isSentByCurrentUser
                  ? conversationStyles.sentMessage
                  : conversationStyles.receivedMessage
            }
        >
          {message.multimedia && (
              <TouchableOpacity onPress={() => router.push(`/media/${message.id}`)}>
                {messageType === 'image' && (
                    <Image
                        source={{ uri: pb.files.getUrl(message, message.multimedia) }}
                        style={conversationStyles.multimedia}
                    />
                )}
                {messageType === 'video' && (
                    <Video
                        source={{ uri: pb.files.getUrl(message, message.multimedia) }}
                        style={conversationStyles.multimedia}
                        useNativeControls
                    />
                )}
                {messageType === 'audio' && (
                    <View>
                      <Text>Audio not supported yet</Text>
                    </View>
                )}
                {messageType === 'file' && <Text>File</Text>}
              </TouchableOpacity>
          )}
          <Text
              style={
                isSentByCurrentUser
                    ? conversationStyles.sentMessageText
                    : conversationStyles.receivedMessageText
              }
          >
            {message.content}
          </Text>
        </View>
    );
  }, [getMediaType]);
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
        {
          loading ? <Text>Loading...</Text> :<>
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
                                {/* It can be .png,.jpg,.gif,.webp,.avif,.mp4,.mpeg,.webm,.avi*/}
                                {getMediaType(message.multimedia) === 'image' ? (
                                    <Image
                                        source={{
                                          uri: pb.files.getUrl(message, message.multimedia),
                                        }}
                                        style={conversationStyles.multimedia}
                                    />
                                ) : getMediaType(message.multimedia) === 'video' ? (
                                    <Video
                                        source={{
                                          uri: pb.files.getUrl(message, message.multimedia),
                                        }}
                                        style={conversationStyles.multimedia}
                                        useNativeControls
                                    />
                                ) : (
                                    <Text>File</Text>
                                )}
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
                    <Text>No messages yet!</Text>
                )}
            </>
        }
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
