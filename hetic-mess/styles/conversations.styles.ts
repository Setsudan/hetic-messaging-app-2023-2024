// ConversationList component
import { StyleSheet } from 'react-native';
import palette from './palette';

const conversationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  conversationItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.secondary,
  },
  conversationText: {
    fontSize: 18,
    color: '#333333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: palette.secondary,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: palette.secondary,
    borderRadius: 8,
  },
  button: {
    width: 40,
    height: 40,
    marginLeft: 8,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: palette.text,
    fontSize: 16,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: palette.primary,
    color: palette.text,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: palette.secondary,
    color: palette.text,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  sentMessageText: {
    textAlign: 'right',
    paddingVertical: 8,
    color: palette.text,
  },
  receivedMessageText: {
    textAlign: 'left',
    paddingVertical: 8,
    color: palette.text,
  },
  multimedia: {
    height: 200,
    width: 200,
    borderRadius: 8,
  }
});

export default conversationStyles;
