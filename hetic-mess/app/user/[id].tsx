import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { pb, filesUrl } from '../../db/pocket';

const defaultUserState = {
  avatar: '',
  collectionId: '',
  collectionName: '',
  created: '',
  emailVisibility: false,
  id: '',
  name: '',
  updated: '',
  username: '',
  verified: false,
};

export default function UserScreen() {
  const [user, setUser] = useState(defaultUserState);
  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRef = await pb.collection('users').getOne(id);
        setUser(userRef || defaultUserState);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const isCurrentUser = id === pb.authStore.model.id;

  return (
    <View style={styles.userProfileContainer}>
      {user ? (
        <>
          <Image
            style={styles.avatar}
            source={{ uri: pb.files.getUrl(user, user.avatar) }}
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>{user.username}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  userProfileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    marginBottom: 10,
  },
  verified: {
    fontSize: 16,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#f9465',
    padding: 10,
    borderRadius: 5,
  },
});
