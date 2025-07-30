import {View, Text, Image} from 'react-native';
import React from 'react';

const HeaderProfileSearch = () => {
  return (
    <View
      style={{height: 70, width: '100%', flexDirection: 'row', marginTop: 10}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text
          style={{
            color: '#fff',
            fontFamily: 'NotoSans_Condensed-SemiBold',
            fontSize: 22,
            paddingLeft: 10,
          }}>
          Pencarian Anime
        </Text>
      </View>
    </View>
  );
};

export default HeaderProfileSearch;
