import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcon from '../assets/Icons/BackIcon';
import { useNavigation } from '@react-navigation/native';
import _404MessageComponentList from '../components/_404MessageComponentList';

const NotificationScreen = ({ route }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1b1b1b' }}>
      {/* Header */}
      <View style={{ height: 50, paddingHorizontal: 15, flexDirection: 'row', marginTop: 20 }}>
        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', paddingLeft: 5, paddingRight: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon color='#fff' size={28} />
          </TouchableOpacity>
        </View>
        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'NotoSans_SemiCondensed-Bold',
              fontSize: 22,
            }}>
            Notification
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, paddingBottom: 120 }}>
        <_404MessageComponentList title='Oops! Belum ada notifikasi di kamu ni' subtitle='Belum bisa kasih notifikasi, tapi jangan khawatir, segera hadir!' />
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
