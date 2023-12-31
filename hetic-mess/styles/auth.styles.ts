// AuthForm component
import { StyleSheet } from 'react-native';
import palette from './palette';

const authFormStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: palette.background,
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: palette.secondary,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  secondaryButton: {
    width: '100%',
    height: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: palette.text,
    fontSize: 16,
  },
  secondaryButtonText: {
    color: palette.primary,
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  passwordVisibilityButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.primary,
    width : '20%',
    borderRadius: 8,
  },
  passwordInput: {
    width: '80%',
    height: 40,
    fontSize: 16,
    borderWidth: 1,
    borderColor: palette.secondary,
    borderRadius: 8,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 8,
  },
    error: {
        color: "red",
        fontSize: 16,
        textAlign: 'center',
    },
});

export default authFormStyles;
