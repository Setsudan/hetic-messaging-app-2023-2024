import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { filesUrl, pb } from "../db/pocket";
import { createConversation, filterConversationsByCurrentUser, getConversations } from "../functions/conversations";
import homeStyles from "../styles/home.styles";

const fetchData = async (): Promise<unknown[]> => {
  try {
    const fetchedConversations = await getConversations();
    return filterConversationsByCurrentUser(fetchedConversations);
  } catch (error) {
    throw error; // Propagate the error for handling at a higher level
  }
};

const fetchPeoples = async () => {
  try {
    const peoples = await pb.collection('users').getFullList({
      filter: `id != "${pb.authStore.model.id}"`,
    });
    return peoples;
  } catch (error) {
    throw error; // Propagate the error for handling at a higher level
  }
};

const Home = () => {
  const [shownConversations, setShownConversations] = useState([]);
  const [showPeoples, setShowPeoples] = useState(false);
  const [peoples, setPeoples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noConversations, setNoConversations] = useState(true);

  useEffect(() => {
    const fetchDataAndLog = async () => {
      try {
        const conversationsRes = await fetchData();
        setShownConversations(conversationsRes);

        const peoplesRes = await fetchPeoples();
        setPeoples(peoplesRes);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndLog();
  }, []);

  const getParticipantsWithoutOurself = (participants: unknown[]): string => {
    const ourself = pb.authStore.model.id;
    /*return participants.filter(participant => participant.id !== ourself);*/
    /* we need to return a string */
    return participants
      .filter(participant => participant.id !== ourself)
      .map(participant => participant.username)
      .join(', ');
  };

  useEffect(() => {
    if (shownConversations.length > 0) {
      setLoading(false);
      setNoConversations(false);
    }
  }, [shownConversations]);

  return (
    <SafeAreaView style={homeStyles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : noConversations ? (
        <Text>No conversations</Text>
      ) : (
        <ScrollView style={homeStyles.conversationList}>
          {shownConversations.map(conv => (
            <TouchableOpacity
              key={conv.id}
              style={homeStyles.conversationItem}
              onPress={() => router.replace(`/conversation/${conv.id}`)}
            >
              <Text>{conv.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <TouchableOpacity
        onPress={() => setShowPeoples(!showPeoples)}
        style={homeStyles.createConversationButton}
      >
        <Text
          style={[
            homeStyles.createConversationButtonText,
            showPeoples ? homeStyles.createConversationButtonTextActive : null,
          ]}
        >
          +
        </Text>
      </TouchableOpacity>
      {showPeoples && (
        <View style={homeStyles.modal}>
          <ScrollView>
            {peoples.map(people => (
              <TouchableOpacity
                key={people.id}
                style={homeStyles.modalScrollContainer}
                onPress={() =>
                  createConversation({
                    participants: [pb.authStore.model.id, people.id],
                  }).then(res => {
                    router.replace(`/conversation/${res.id}`);
                  })
                }
              >
                <Image
                  source={{ uri: `${filesUrl}${people.id}/${people.avatar}` }}
                  style={{ width: 50, height: 50 }}
                />
                <Text>{people.username}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
