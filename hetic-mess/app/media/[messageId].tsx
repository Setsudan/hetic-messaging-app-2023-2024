import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { pb } from '../../db/pocket';
export default function MediaFullDisplayScreen() {
  const { messageId } = useRoute().params;
  const [media, setMedia] = useState(null);
  const { height, width } = Dimensions.get('window');

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const mediaRef = await pb.collection('messages').getOne(messageId);
        setMedia(pb.files.getUrl(mediaRef, mediaRef.multimedia));
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    fetchMedia();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}
    >
      <TouchableOpacity
        onPress={() => {
          router.pop();
        }}
        style={styles.btn}
      >
        <Text>Back</Text>
      </TouchableOpacity>
      {media ? (
        <Image source={{ uri: media }} style={{ width, height }} />
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
