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
import SignUpScreen from './src/screens/SignUpEmailScreen/SignUpScreen';
import VerifyEmailScreen from './src/screens/SignUpEmailScreen/VerifyEmailScreen';
import { GOOGLE_WEB_CLIENT_ID } from '@env';

const Stack = createNativeStackNavigator();

const App = () => {

  React.useEffect(()=>{
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID, 
      offlineAccess: true,
    })  
  },[])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, animation: 'slide_from_bottom'}}
          initialRouteName="LoginScreen">
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen}   options={{
            animation: 'fade', // atau 'fade', 'flip', 'simple_push'
            headerShown: false,
            animationDuration: 2000,
          }} />
          <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen}   options={{
            animation: 'fade_from_bottom', // atau 'fade', 'flip', 'simple_push'
            headerShown: false,
            animationDuration: 1000,
          }} />
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
