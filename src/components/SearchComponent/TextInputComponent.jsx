import {View, Text, TextInput} from 'react-native';
import React from 'react';
import SearchIcon from '../../assets/Icons/SearchIcon';

const TextInputComponent = () => {
  return (
    <View
      style={{
        height: 'auto',
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 30,
      }}>
      <View style={{position: 'relative', overflow: 'hidden'}}>
        <View style={{position: 'absolute', zIndex: 99, top: 7, left: 5}}>
          <SearchIcon size={32} color="#000" />
        </View>
        <TextInput
          style={{
            height: 50,
            width: '100%',
            backgroundColor: 'rgba(255,255,255,0.9)', // Lebih terang biar clean
            color: '#000',
            fontSize: 18,
            borderWidth: 1.5,
            borderColor: 'rgba(155, 12, 198, 0.7)',
            borderRadius: 12, // Rounded corners biar lebih modern
            paddingLeft: 40,
            paddingRight: 15,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 4, // Efek bayangan biar lebih stylish
            elevation: 3, // Shadow khusus Android
            textAlignVertical: 'center',
          }}
          autoCorrect={true}
          placeholder="Masukkan teks di sini..."
          placeholderTextColor="rgba(0,0,0,0.7)" // Placeholder transparan biar lebih soft
          cursorColor={'rgba(0,0,0,0.8)'}
        />
      </View>
    </View>
  );
};

export default TextInputComponent;
