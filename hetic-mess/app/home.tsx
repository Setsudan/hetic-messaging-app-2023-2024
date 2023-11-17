import { useEffect, useState } from 'react';
import {
    StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl,
    SafeAreaView,
    Image,
} from 'react-native';
import { pb, filesUrl } from '../db/pocket';
import { Link, router } from 'expo-router';

import { extractParticipantsUsernames, filterConversationsByCurrentUser, getConversations } from '../functions/conversations';



const fetchData = async (): Promise<unknown[]> => {
    const fetchedConversations = await getConversations();
    const filteredConversations = filterConversationsByCurrentUser(fetchedConversations);

    const updatedConversations = await Promise.all(filteredConversations.map(async (conversation) => {
        const participantsUsername = await extractParticipantsUsernames(conversation.participants);
        return { id: conversation.id, participantsUsername };
    }));

    return updatedConversations;
};

const fetchPeoples = async () => {
    const peoples = await pb.collection('users').getFullList({
        filter: `id != "${pb.authStore.model.id}"`
    });
    return peoples;
}

const Home = () => {
    const [shownConversations, setShownConversations] = useState([]);

    const [showPeoples, setShowPeoples] = useState(false);
    const [peoples, setPeoples] = useState([]);

    useEffect(() => {
        fetchData().then((res) => {
            setShownConversations(res);
        });
        fetchPeoples().then((res) => {
            setPeoples(res);
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={() => fetchData()} />
                }
            >
                {shownConversations.map((conversation) => (
                    <Link
                        style={styles.conversation}
                        key={conversation.id} href={`/conversation/${conversation.id}`}>
                        <Text>{
                            conversation.participantsUsername.filter(username => username !== pb.authStore.model.username).join(',')
                        }</Text>
                    </Link>
                ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowPeoples(!showPeoples)} style={styles.btn}>
                <Text style={[styles.btntxt, showPeoples ? styles.btntxtactive : null,]}>+</Text>
            </TouchableOpacity>
            {
                showPeoples && (
                    <View style={styles.peoples}>
                        <ScrollView>
                            {peoples.map((people) => (
                                <TouchableOpacity
                                    key={people.id}
                                    style={styles.peopleresult}
                                    onPress={() => createConversation({ "participants": [pb.authStore.model.id, people.id] }).then((res) => {
                                        router.replace(`/conversation/${res.id}`);
                                    })}
                                >
                                    <Image source={{ uri: `${filesUrl}${people.id}/${people.avatar}` }} style={{ width: 50, height: 50 }} />
                                    <Text>{people.username}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )
            }
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
