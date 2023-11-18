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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
  },
  button: {
    width: 40,
    height: 40,
    marginLeft: 8,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4CAF50',
    color: '#FFFFFF',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#CCCCCC',
    color: '#FFFFFF',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  msgContent: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default conversationStyles;
