import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import MainScreen from './src/screens/MainScreen';
import ListRecentAnimeScreen from './src/screens/ListAnimeScreen/ListRecentAnimeScreen';
import ListAnimeMovie from './src/screens/ListAnimeScreen/ListAnimeMovie';
import ListAnimeOngoing from './src/screens/ListAnimeScreen/ListAnimeOngoing';
import ListPopularAnime from './src/screens/ListAnimeScreen/ListPopularAnime';
import DetailAnimeScreen from './src/screens/DetailAnimeScreen';
import WatchAnimeScreen from './src/screens/WatchAnimeScreen';
import ListAnimeByGenre from './src/components/SearchComponent/ListAnimeByGenre';
import NotificationScreen from './src/screens/NotificationScreen';
import ListAllAnime from './src/screens/ListAnimeScreen/ListAllAnime';
import LisenceScreen from './src/components/ProfileComponent/LisenceScreen';
import AboutScreen from './src/components/ProfileComponent/AboutScreen';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/Onboarding/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';

const Stack = createNativeStackNavigator();

const App = () => {

    const handleLogout = () => {
      Alert.alert(
        'Konfirmasi Logout 🧐',
        'Apakah kamu yakin ingin keluar dari akun Google kamu?',
        [
          {
            text: 'Batal ❌',
            style: 'cancel',
          },
          {
            text: 'Ya, Logout 🚪',
            onPress: async () => {
              try {
                // Logout dari Firebase
                await signOut(auth);
  
                // Logout juga dari Google Sign-In
                await GoogleSignin.signOut();
  
                Alert.alert('👋 Sampai jumpa!', 'Kamu berhasil logout.');
              } catch (error) {
                console.error('Logout error:', error);
                Alert.alert(
                  'Logout Gagal 😵',
                  error.message || 'Terjadi kesalahan saat logout.',
                );
              }
            },
          },
        ],
        {cancelable: true},
      );
    };

  // React.useEffect(() => {
  //   handleLogout();
  // })

  React.useEffect(()=>{
    GoogleSignin.configure({
      webClientId: "941395741581-dqdgs7b9phq590nq9s0lhl5id00on34f.apps.googleusercontent.com", 
      offlineAccess: true,
    })  
  },[])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, animation: 'slide_from_bottom'}}
          initialRouteName="SplashScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="ListAllAnime" component={ListAllAnime} />
          <Stack.Screen name="ListAnimeRecent" component={ListRecentAnimeScreen} />
          <Stack.Screen name="ListAnimeGenre" component={ListAnimeByGenre} />
          <Stack.Screen name="ListAnimePopular" component={ListPopularAnime} />
          <Stack.Screen name="ListAnimeOngoing" component={ListAnimeOngoing} />
          <Stack.Screen name="ListAnimeMovie" component={ListAnimeMovie} />
          <Stack.Screen name="DetailAnime" component={DetailAnimeScreen} options={{ orientation: 'portrait' }}  />
          <Stack.Screen name="WatchAnime" component={WatchAnimeScreen} options={{ animation: 'fade_from_bottom' }} />
          <Stack.Screen name="Lisence" component={LisenceScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
