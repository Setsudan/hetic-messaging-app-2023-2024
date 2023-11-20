import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { pb } from '../../db/pocket';
import palette from '../../styles/palette';
import { People } from '../../types/people.type';
import { router } from "expo-router";

export default function SettingsProfileScreen() {
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedUsername, setEditedUsername] = useState('');
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [verified, setVerified] = useState(false);

  const currentUser: People = pb.authStore.model;

  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `Member since: ${day}/${month}/${year}`;
  };

  const handleEdit = () => {
    setEditing(true);
    setEditedName(currentUser.name);
    setEditedEmail(currentUser.email);
    setEditedUsername(currentUser.username);
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append('name', editedName);
    data.append('email', editedEmail);
    data.append('username', editedUsername);
    if (file) {
      data.append('avatar', {
        name: "media",
        type: "image/*",
        uri: file
      });
    }
    try {
      const record = await pb
        .collection('users')
        .update(pb.authStore.model.id, data);
    } catch (error) {
      console.error(error);
    }
    setEditing(false);
  };

  const handleChangePfp = async () => {
    // Change the profile picture here
    // Example: pb.authStore.changePfp();
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        // Update state with the selected image
        setFile(result.uri);
        setSelectedImage(result.uri);
      }
    } catch (error) {
      console.error('Error selecting media:', error);
    }
  };

  return (
    <View style={styles.container}>
     <View style={styles.nav}>
       <TouchableOpacity onPress={() => router.replace('/home')}>
          <Text style={styles.navBack}>←</Text>
        </TouchableOpacity>
       <Text style={styles.title}>Profile</Text>
     </View>
      {editing ? (
        <>
          <View style={styles.avatar}>
            <TouchableOpacity onPress={handleChangePfp}>
              <Image
                source={{
                  uri: pb.files.getUrl(currentUser, currentUser.avatar),
                }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
              <Text style={styles.avatarEditBtnTxt}>🖋️</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            value={editedName}
            onChangeText={setEditedName}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={editedUsername}
            onChangeText={setEditedUsername}
            autoCapitalize="none"
          />
        </>
      ) : (
        <>
          <View style={styles.avatar}>
            <Image
              source={{
                uri: pb.files.getUrl(currentUser, currentUser.avatar),
              }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          </View>
          <Text style={styles.label}>
            Name: <Text style={styles.text}>{currentUser.name}</Text>
          </Text>
          <Text style={styles.label}>
            Username: <Text style={styles.text}>{currentUser.username}</Text>
          </Text>
          <Text style={styles.text}>{formatDate(currentUser.created)}</Text>
        </>
      )}
      {editing ? (
        <Button title="Save" onPress={handleSave} />
      ) : (
        <Button title="Edit" onPress={handleEdit} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 45,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    borderColor: palette.primary,
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  avatar: {
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 50,
  },
  avatarEditBtnTxt: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: palette.primary,
    color: palette.text,
    fontSize: 20,
    padding: 5,
    borderRadius: 50,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  navBack: {
    fontSize: 20,
    marginRight: 10,
  },
});
