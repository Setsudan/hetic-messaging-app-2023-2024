import { StyleSheet } from 'react-native';

import palette from './palette';

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  conversationList: {
    flex: 1,
  },
  conversationItem: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: palette.secondary,
  },
  conversationInfo: {
    flex: 1,
  },
  conversationAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 1,
    borderColor: palette.primary,
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
  conversationLastMessageContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  conversationLastMessage: {
    fontSize: 14,
    paddingVertical: 8,
  },
  conversationLastMessageDate: {
    fontSize: 14,
    paddingVertical: 8,
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
});

export default homeStyles;
