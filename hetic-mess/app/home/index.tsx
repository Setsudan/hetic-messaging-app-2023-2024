import { Image } from 'expo-image';
import { router } from 'expo-router';
import { RecordModel } from 'pocketbase';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { pb } from '../../db/pocket';
import {
  filterConversationsByCurrentUser,
  getConversations,
  formatSentAt
} from '../../functions/conversations';
import { getUserById } from '../../functions/users';
import homeStyles from '../../styles/home.styles';
import {
  Conversation,
  UpdatedConversation,
} from '../types/conversations.types';
import { People } from '../types/people.type';

function consoleDebug(message) {
  if (__DEV__) {
    console.log(message);
  }
}

const handleConversations = async (
  conversations: UpdatedConversation[],
): Promise<UpdatedConversation[]> => {
  const updatedConversations: UpdatedConversation[] = [];

  for (const conversation of conversations) {
    const participants: Awaited<RecordModel>[] = await Promise.all(
      conversation.participants.map(async participantId => {
        if (participantId !== pb.authStore.model.id) {
          const user = await getUserById(participantId);
          return user;
        }
      }),
    );

    // Filter out undefined values from the participants array
    const filteredParticipants = participants.filter(
      participant => participant,
    );

    consoleDebug(filteredParticipants);

    const lastMessageId =
      conversation.messages[conversation.messages.length - 1];
    try {
      const lastMessage = await pb.collection('messages').getOne(lastMessageId);
      const sender = await getUserById(lastMessage.sender);

      updatedConversations.push({
        ...conversation,
        // @ts-ignore
        last_message: {
          content: lastMessage.content,
          sender: sender.name,
          senderId: lastMessage.sender,
          sentAt: lastMessage.updated,
        },
        participants: filteredParticipants as People[],
      });
    } catch (error) {
      consoleDebug(
        `Error fetching last message for conversation ${conversation.id}: ${error.message}`,
      );
    }
  }

  return updatedConversations;
};

const fetchConversations = async (): Promise<Conversation[]> => {
  try {
    const conversations = await getConversations();
    const filteredConversations =
      filterConversationsByCurrentUser(conversations);
    return filteredConversations;
  } catch (error) {
    consoleDebug(`Error fetching conversations: ${error.message}`);
    throw error; // Rethrow the error for higher-level handling if needed
  }
};

const fetchConversationsWithLastMessage = async (): Promise<
  UpdatedConversation[]
> => {
  try {
    const conversations = await fetchConversations();
    const conversationsWithLastMessage =
      await handleConversations(conversations);
    return conversationsWithLastMessage;
  } catch (error) {
    consoleDebug(
      `Error fetching conversations with last message: ${error.message}`,
    );
    throw error; // Rethrow the error for higher-level handling if needed
  }
};

const Index = () => {
  const [shownConversations, setShownConversations] = useState<Conversation[]>(
    [],
  );
  const [conversations, setConversations] = useState<UpdatedConversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const conversations = await fetchConversationsWithLastMessage();
      setConversations(conversations);
      setShownConversations(conversations);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    consoleDebug(['element', conversations[0]?.last_message?.sentAt]);
  }, [conversations]);

  return (
    <SafeAreaView style={homeStyles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView style={homeStyles.conversationList}>
          {conversations.map(conv => (
            <TouchableOpacity
              key={conv.id}
              style={homeStyles.conversationItem}
              onPress={() =>
                router.replace(`/conversations/conversation/${conv.id}`)
              }
            >
              <Image
                source={{
                  uri: pb.files.getUrl(
                    conv.participants[0],
                    conv.participants[0].avatar,
                  ),
                }}
                style={homeStyles.conversationAvatar}
              />
              <View style={homeStyles.conversationInfo}>
                <Text style={homeStyles.conversationTitle}>
                  {conv.is_group
                    ? conv.name
                    : conv.participants[0]?.name ||
                      conv.participants[0]?.id ||
                      'Unknown'}
                </Text>
                <View style={homeStyles.conversationLastMessageContainer}>
                  <Text style={homeStyles.conversationLastMessage}>
                    {conv.last_message?.senderId === pb.authStore.model.id
                      ? 'You: '
                      : `${conv.last_message?.sender}: `}
                    {/* Only first 25 char, and if longer add '...'*/}
                    {conv.last_message?.content?.length >= 15
                      ? `${conv.last_message?.content?.slice(0, 15)}...`
                      : conv.last_message?.content}
                  </Text>
                  <Text style={homeStyles.conversationLastMessageDate}>
                    {formatSentAt(conv?.last_message?.sentAt)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <TouchableOpacity
        onPress={() => router.push('/conversations/create')}
        style={homeStyles.createConversationButton}
      >
        <Text style={homeStyles.createConversationButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;
