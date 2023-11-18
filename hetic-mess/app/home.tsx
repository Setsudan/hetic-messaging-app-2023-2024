import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
} from 'react-native';

import { pb, filesUrl } from '../db/pocket';
import {
  extractParticipantsUsernames,
  filterConversationsByCurrentUser,
  getConversations,
  createConversation,
} from '../functions/conversations';

const fetchData = async (): Promise<unknown[]> => {
  try {
    const fetchedConversations = await getConversations();
    const filteredConversations =
      filterConversationsByCurrentUser(fetchedConversations);
    const updatedConversations = await Promise.all(
      filteredConversations.map(async conversation => {
        const participants = await extractParticipantsUsernames(
          conversation.participants,
        );
        return { id: conversation.id, participants };
      }),
    );

    return updatedConversations;
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

  const getParticipantsWithoutOurself = (participants: unknown[]):string => {
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
      console.log('post loading', shownConversations);
      setLoading(false);
      setNoConversations(false);
    }
  }, [shownConversations]);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : noConversations ? (
        <Text>No conversations</Text>
      ) : (
        <ScrollView style={styles.scrollView}>
          {shownConversations.map(conv => (
            <TouchableOpacity
              key={conv.id}
              style={styles.conversation}
              onPress={() => router.replace(`/conversation/${conv.id}`)}
            >
              <Text>{getParticipantsWithoutOurself(conv.participants)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <TouchableOpacity
        onPress={() => setShowPeoples(!showPeoples)}
        style={styles.btn}
      >
        <Text style={[styles.btntxt, showPeoples ? styles.btntxtactive : null]}>
          +
        </Text>
      </TouchableOpacity>
      {showPeoples && (
        <View style={styles.peoples}>
          <ScrollView>
            {peoples.map(people => (
              <TouchableOpacity
                key={people.id}
                style={styles.peopleresult}
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

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntxt: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  btntxtactive: {
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  conversation: {
    padding: 20,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
  },
  peoples: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '80%',
    backgroundColor: '#fff',
    padding: 20,
  },
  peopleresult: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default Home;
