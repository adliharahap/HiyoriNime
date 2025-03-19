import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import ScheduleScreen from './ScheduleScreen';
import ProfileScreen from './ProfileScreen';
import HomeIcon from '../assets/Icons/HomeIcon';
import SearchIcon from '../assets/Icons/SearchIcon';
import ScheduleIcon from '../assets/Icons/ScheduleIcon';
import ProfileIcon from '../assets/Icons/ProfileIcon';
import { SafeAreaView } from 'react-native-safe-area-context';
import CollectionIcon from '../assets/Icons/CollectionIcon';
import CollectionScreen from './CollectionScreen';

const MainScreen = () => {
  const _renderIcon = (routeName, selectedTab) => {
    let IconComponent;
    switch (routeName) {
      case 'Home':
        IconComponent = HomeIcon;
        break;
      case 'Search':
        IconComponent = SearchIcon;
        break;
      case 'Schedule':
        IconComponent = ScheduleIcon;
        break;
      case 'Collection':
        IconComponent = CollectionIcon;
        break;
      case 'Profile':
        IconComponent = ProfileIcon;
        break;
      default:
        IconComponent = HomeIcon;
    }
    return <IconComponent size={28} color={routeName === selectedTab ? '#fff' : '#7E7E7E'} />;
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }) => (
    <TouchableOpacity onPress={() => navigate(routeName)} style={styles.tabbarItem}>
      {_renderIcon(routeName, selectedTab)}
    </TouchableOpacity>
  );
  return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
        <CurvedBottomBar.Navigator
        type="DOWN"
        style={styles.bottomBar}
        screenOptions={{ headerShown: false }}
        height={65}
        circleWidth={50}
        circlePosition={"CENTER"}
        bgColor="rgb(26, 24, 24)"
        initialRouteName="Home"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View
            style={[
              styles.btnCircleUp,
              { backgroundColor: selectedTab === 'Search' ? '#9999cc' : 'rgb(64, 46, 34)' },
            ]}
          >
            <TouchableOpacity style={styles.button} onPress={() => navigate('Search')}>
              <SearchIcon size={30} color={selectedTab === 'Search' ? '#fff' : '#ccc'} />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBar.Screen name="Home" component={HomeScreen} position="LEFT" />
        <CurvedBottomBar.Screen name="Schedule" component={ScheduleScreen} position="LEFT" />
        <CurvedBottomBar.Screen name="Search" component={SearchScreen} position="CENTER" />
        <CurvedBottomBar.Screen name="Collection" component={CollectionScreen} position="RIGHT" />
        <CurvedBottomBar.Screen name="Profile" component={ProfileScreen} position="RIGHT" />
      </CurvedBottomBar.Navigator>
      </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
});

export default MainScreen;