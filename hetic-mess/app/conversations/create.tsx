import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';

import { pb } from '../../db/pocket';
import {
  getConversations,
  createConversation,
} from '../../functions/conversations';
import { getVerifiedUsers } from '../../functions/users';
import palette from '../../styles/palette';
import { Conversation } from '../../types/conversations.types';
import { People } from '../../types/people.type';
import homeStyles from "../../styles/home.styles";

const checkConversation = async (userId: string, participantsId: string) => {
  const conversations = await pb.collection('conversations').getFullList({
    filter: `participants.id ?= "${participantsId}"`,
  });

  return conversations;
};

const CreateConversationScreen = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [peoples, setPeoples] = useState<People[]>([]);
  const [convParticipants, setConvParticipants] = useState<People[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleNextButtonClick = async () => {
    if (convParticipants.length === 1) {
      const convParticipant = convParticipants[0];

      try {
        const existingConversation = await checkConversation(
          pb.authStore.model.id,
          convParticipant.id,
        );

        if (existingConversation.length > 0) {
          // Redirect to existing conversation
          router.push(
            `/conversations/conversation/${existingConversation[0].id}`,
          );
        } else {
          // Create a new conversation
          createConversation({
            participants: [pb.authStore.model.id, convParticipant.id],
            is_group: false,
            name: null,
          }).then(rec => {
            router.push(`/conversations/conversation/${rec.id}`);
          });
        }
      } catch (error) {
        console.error('Error checking conversation:', error);
      }
    } else {
      // Conversation name will be the joined names of the all participants including the current user
      const conversationName = convParticipants
        .map(participant => participant.name)
        .join(', ');

      // Create a new conversation with multiple participants
      createConversation({
        participants: [
          pb.authStore.model.id,
          ...convParticipants.map(participant => participant.id),
        ],
        is_group: true, // Set to true for group conversations
        name: conversationName,
      }).then(rec => {
        router.push(`/conversations/conversation/${rec.id}`)
      });
    }
  };

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await getConversations();
      setConversations(res);
    };

    const fetchPeoples = async () => {
      const res = await getVerifiedUsers();
      setPeoples(res);
    };

    fetchConversations();
    fetchPeoples();
  }, []);

  const handleAddParticipant = (person: People) => {
    setConvParticipants(prevParticipants => [...prevParticipants, person]);
  };

  const handleRemoveParticipant = (person: People) => {
    setConvParticipants(prevParticipants =>
      prevParticipants.filter(p => p.id !== person.id),
    );
  };

  const filteredPeople = peoples
    .filter(
      person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.username.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter(person => person.id !== pb.authStore.model.id)
    .filter(
      person =>
        !convParticipants.some(participant => participant.id === person.id),
    );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or username"
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
      />
      {convParticipants.length > 0 && (
        <View style={styles.participantsContainer}>
          <Text>Participants:</Text>
          <ScrollView style={styles.participantsContainerRow}>
            {convParticipants.map(participant => (
              <View key={participant.id} style={styles.tag}>
                <Text style={styles.tagText}>{participant.name}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveParticipant(participant)}
                >
                  <Text style={styles.tagCross}>x</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      <ScrollView>
        {filteredPeople.map(person => (
          <View key={person.id} style={styles.personContainer}>
            <TouchableOpacity
              style={styles.personInfo}
              onPress={() => {
                router.push(`/user/${person.id}`);
              }}
            >
              <Image
                source={{
                  uri:
                    person.avatar === ''
                      ? 'https://images.pexels.com/photos/1561020/pexels-photo-1561020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                      : pb.files.getUrl(
                        person,
                        person.avatar,
                      ),
                }}
                style={homeStyles.conversationAvatar}
              />
              <Text>{person.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleAddParticipant(person)}>
              <Text style={styles.button}>Add</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleNextButtonClick}
      >
        <Text style={styles.floatingButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 64,
  },
  personContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  personInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  button: {
    color: 'blue',
    marginLeft: 8,
  },
  participantsContainer: {
    marginVertical: 16,
  },
  participantsContainerRow: {
    flexDirection: 'row',
    display: 'flex',
    gap: 3,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  tag: {
    backgroundColor: palette.primary,
    display: 'flex',
    flexDirection: 'row',
    width: 75,
    padding: 5,
    borderRadius: 8,
  },

  tagText: {
    color: palette.background,
  },

  tagCross: {
    marginLeft: 5,
    color: palette.background,
    fontWeight: 'bold',
    fontSize: 16,
  },

  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: palette.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },

  floatingButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CreateConversationScreen;
