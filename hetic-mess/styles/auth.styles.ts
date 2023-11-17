// AuthForm component
import { StyleSheet } from 'react-native';

const authFormStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default authFormStyles;
