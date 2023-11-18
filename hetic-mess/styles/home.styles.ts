import { StyleSheet } from 'react-native';

import palette from './palette';

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  scrollContainer: {
    flex: 1,
  },
  conversationList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  conversationItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: palette.secondary,
    borderRadius: 8,
  },
  conversationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  conversationMessage: {
    fontSize: 14,
    color: palette.text,
  },
  createConversationButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 60,
    height: 60,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  createConversationButtonText: {
    color: palette.text,
    fontSize: 16,
    },
    createConversationButtonTextActive: {
        transform: [{ rotate: '45deg' }],
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: palette.background,
    },
    modalScrollContainer: {
        flex: 1,
    },
});

export default homeStyles;
