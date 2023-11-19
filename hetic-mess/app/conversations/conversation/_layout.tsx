import { router, Slot } from 'expo-router';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function ConversationLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => {
            router.push(`/home`);
          }}
        >
          <Text style={styles.title}>⬅️</Text>
        </TouchableOpacity>
      </View>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    height: 75,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
