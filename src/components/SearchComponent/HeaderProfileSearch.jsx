import {View, Text, Image} from 'react-native';
import React from 'react';

const HeaderProfileSearch = () => {
  return (
    <View
      style={{height: 70, width: '100%', flexDirection: 'row', marginTop: 10}}>
      <View
        style={{
          width: 80,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/Images/Default_Profile_Screen.jpg')}
          style={{height: 45, width: 45, borderRadius: 100}}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text
          style={{
            color: '#fff',
            fontFamily: 'NotoSans_Condensed-SemiBold',
            fontSize: 22,
          }}>
          Pencarian Anime
        </Text>
      </View>
    </View>
  );
};

export default HeaderProfileSearch;
