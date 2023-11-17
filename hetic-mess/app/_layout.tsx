import { Link, Slot } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { pb } from '../db/pocket';

const fileURI =
  'https://091c-77-132-153-46.ngrok-free.app/api/files/_pb_users_auth_/';

const Layout = () => {
  const [userAvatar, setUserAvatar] = React.useState('');
  const [userId, setUserId] = React.useState('');

  useEffect(() => {
    if (pb.authStore.model) {
      setUserAvatar(pb.authStore.model.avatar);
      setUserId(pb.authStore.model.id);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Link style={styles.title} href={'/home'}>
          Messaging App
        </Link>
        <Image
          source={{ uri: `${fileURI}${userId}/${userAvatar}` }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    height: 100,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default Layout;
