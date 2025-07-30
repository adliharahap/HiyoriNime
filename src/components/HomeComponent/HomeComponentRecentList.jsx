import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity} from 'react-native';
import HomeCarousel from './HomeCarousel';

const HomeComponentRecentList = ({ headerTitle, onPress, data, loading }) => {
  
  return (
    <View style={{ height: 250, width: '100%', marginBottom: 10 }}>
      {/* Header & Title */}
      <View
        style={{
          height: 50,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontFamily: 'NotoSans_Condensed-SemiBold',
            fontSize: 16,
          }}
        >
          {headerTitle}
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Text
            style={{
              color: 'rgba(229, 57, 53, 1)',
              fontFamily: 'NotoSans_Condensed-Regular',
              fontSize: 16,
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 25}}>
        <HomeCarousel data={data} />
      </View>
    </View>
  );
};

export default HomeComponentRecentList;
