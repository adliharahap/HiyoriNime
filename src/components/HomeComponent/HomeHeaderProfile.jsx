import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import NotificationIcon from '../../assets/Icons/NotificationIcon';
import SearchIcon from '../../assets/Icons/SearchIcon';
import {getGreeting} from '../../utils/getGreeting';
import {useNavigation} from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';
import { useSelector } from 'react-redux';

const HomeHeaderProfile = () => {
  const navigation = useNavigation();
  const [greeting, setGreeting] = useState('');
  const dataUser = useSelector(state => state.user.userData);

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <View
      style={{height: 90, width: '100%', flexDirection: 'row', marginTop: 20}}>
      <View
        style={{
          width: 80,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FastImage
          style={{height: 65, width: 65, borderRadius: 50, borderWidth: 1.1, borderColor: '#fff'}}
          source={
            dataUser?.photo || dataUser?.photoURL
              ? {uri: dataUser.photo || dataUser.photoURL, priority: FastImage.priority.normal}
              : require('../../assets/Images/Default_Profile_Screen.jpg')
          }
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: 14,
            fontFamily: 'NotoSans_SemiCondensed-Semi-Bold',
          }}
          numberOfLines={1}>
          {greeting}
        </Text>
        <Text
          style={{
            color: '#fff',
            fontFamily: 'NotoSans_SemiCondensed-Bold',
            fontSize: 16,
          }}
          numberOfLines={2}>
          {dataUser?.name || 'User'}
        </Text>
        <Text
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'NotoSans_SemiCondensed-Regular',
            fontSize: 12,
          }}
          numberOfLines={1}>
          {dataUser?.email || "login Via " + dataUser?.provider || "Login sebagai Guest"}
        </Text>
      </View>
      <View
        style={{
          width: 110,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Notification');
          }}>
          <NotificationIcon size={26} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Search');
          }}>
          <SearchIcon size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeaderProfile;
