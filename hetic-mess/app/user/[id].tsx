import { useState, useEffect } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { pb, filesUrl,  } from '../../db/pocket';

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

  const handleEditPress = () => {

    console.log('Edit button pressed');
  };

  return (
    <View>
      {user ? (
        <View>
          <Image source={{ uri: `${filesUrl}${user.id}/${user.avatar}` }} style={{ width: 100, height: 100 }} />
          <Text>{user.name}</Text>
          <Text>{user.username}</Text>
          <Text>{user.emailVisibility ? 'Email visible' : 'Email not visible'}</Text>
          <Text>{user.verified ? 'Verified' : 'Not verified'}</Text>
          {isCurrentUser && <Button title="Edit" onPress={handleEditPress} />}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
