import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import NotificationIcon from '../../assets/Icons/NotificationIcon'
import SearchIcon from '../../assets/Icons/SearchIcon'
import { getGreeting } from '../../utils/getGreeting'
import { useNavigation } from '@react-navigation/native'

const HomeHeaderProfile = () => {
    const greeting = getGreeting();
    const navigation = useNavigation();
    
  return (
    <View style={{height: 120, width: '100%', flexDirection: 'row'}}>
            <View style={{width: 100, height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                    source={require('../../assets/Images/Default_Profile_Screen.jpg')}
                    style={{height: 80, width: 80, borderRadius: 100}}
                />
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: 'rgba(255,255,255,0.8)', fontSize: 16, fontFamily: "NotoSans_SemiCondensed-Semi-Bold"}} numberOfLines={1}>{greeting}</Text>
                <Text style={{color: '#fff', fontFamily: "NotoSans_SemiCondensed-Bold", fontSize: 18}} numberOfLines={2}>Adli Rahman Harun Harahap</Text>
                <Text style={{color: 'rgba(255,255,255,0.7)', fontFamily: "NotoSans_SemiCondensed-Regular", fontSize: 14}} numberOfLines={1}>adliraahman7@gmail.com</Text>
            </View>
            <View style={{width: 110, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' ,paddingHorizontal: 10}}>
                <TouchableOpacity onPress={() => {navigation.navigate('Notification')}}>
                    <NotificationIcon size={28} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Search')}}
                >
                    <SearchIcon size={34} color='#fff' />
                </TouchableOpacity>
            </View>
        </View>
  )
}

export default HomeHeaderProfile