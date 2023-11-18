import { Link, router, Slot } from "expo-router";
import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

import { pb, filesUrl } from '../db/pocket';

const Layout = () => {
  const [userAvatar, setUserAvatar] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [finalUrl, setFinalUrl] = React.useState('');

  useEffect(() => {
    if (pb.authStore.isValid) {
      setUserAvatar(pb.authStore.model.avatar);
      setUserId(pb.authStore.model.id);
      setFinalUrl(`${filesUrl}${userId}/${userAvatar}`);
    } else {
      setUserAvatar('');
      setUserId('');
    }
  }, []);

  useEffect(() => {
    if (pb.authStore.isValid) {
      setUserAvatar(pb.authStore.model.avatar);
      setUserId(pb.authStore.model.id);
      setFinalUrl(`${filesUrl}${userId}/${userAvatar}`);
    } else {
      setUserAvatar('');
      setUserId('');
    }
  }, [pb.authStore.isValid]);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Link style={styles.title} href={'/home'}>
          Messaging App
        </Link>
        <TouchableOpacity
          onPress={() => {
            router.push(`/user/${userId}`);
          }}
        >
          <Image
            source={finalUrl ? finalUrl : null}
            contentFit="cover"
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
        {pb.authStore.isValid ?? (
          <TouchableOpacity
            onPress={() => {
              pb.authStore.clear();
            }}
          >
            <Text>Logout</Text>
          </TouchableOpacity>)}
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
