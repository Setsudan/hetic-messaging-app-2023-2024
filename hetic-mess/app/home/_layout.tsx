import { Link, router, Slot } from 'expo-router';
import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

import { pb, filesUrl } from '../../db/pocket';

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
    <View style={styles.wrapper}>
      <View style={styles.navbar}>
        <Link style={styles.title} href="/app/home">
          Messaging App
        </Link>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => {
              router.push(`/settings`);
            }}
            style={{ marginRight: 10 }}
          >
            <Image
              source={{
                uri: pb.files.getUrl(pb.authStore.model, pb.authStore.model.avatar),
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    height: 75,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default Layout;
