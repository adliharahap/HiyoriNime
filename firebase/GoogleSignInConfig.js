import { GoogleOneTapSignIn } from '@react-native-google-signin/google-signin';

export const configureUniversalGoogleSignIn = () => {
  GoogleOneTapSignIn.configure({
    webClientId: 'autoDetect', // ⬅️ ini bisa auto dari google-services.json
  });
};