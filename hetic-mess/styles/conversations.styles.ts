// ConversationList component
import { StyleSheet } from 'react-native';

const conversationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  conversationItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  conversationText: {
    fontSize: 18,
    color: '#333333',
  },
});

export default conversationStyles;
