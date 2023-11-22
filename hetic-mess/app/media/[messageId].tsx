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
import { Video} from "expo-av";

import { pb } from '../../db/pocket';

// get file extensions to know if it's an image, an audio or a video
const getMediaType = (fileName) => {
  const ext = fileName.split('.').pop();
  if (ext === 'jpg' || ext === 'png' || ext === 'gif' || ext === 'webp' || ext === 'avif') {
    return 'image';
  } else if (ext === 'mp4' || ext === 'mpeg' || ext === 'webm' || ext === 'avi') {
    return 'video';
  } else if (ext === 'mp3' || ext === 'wav' || ext === 'ogg') {
    return 'audio';
  } else {
    return 'file';
  }
}

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
        getMediaType(media) === 'image' ? (
          <Image
            source={{
              uri: media,
            }}
            style={{
              width: width,
              height: height,
            }}
          />
        ) : getMediaType(media) === 'video' ? (
          <Video
            source={{
              uri: media,
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            shouldPlay
            isLooping
            style={{
              width: width,
              height: height,
            }}
          />
        ) : (
          <Text>Not supported</Text>
        )
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
