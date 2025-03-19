import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const RecentListAnimeImageBackground = ({title, eps, releasedOn, ImgBackground}) => {
  return (
    <>
        <ImageBackground source={{uri: ImgBackground}} style={{height: '100%', maxHeight: 200, width: 150, backgroundColor: '#000', borderRadius: 15, overflow: 'hidden'}}>
            <LinearGradient colors={['rgba(255,255,255,0.0)', 'rgba(0,0,0,0.8)']} locations={[0.5, 1]} style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 10, paddingHorizontal: 5}}>
                <View>
                    <Text style={{color: '#fff', fontFamily: "NotoSans_Condensed-SemiBold", fontSize: 17, textAlign: 'center'}} numberOfLines={1}>{title}</Text>
                    <Text style={{color: 'rgba(255,255,255,0.8)', fontFamily: "OpenSans_Condensed-SemiBold", fontSize: 13, textAlign: 'center'}} numberOfLines={1}>Eps. {eps}</Text>
                    <Text style={{color: 'rgba(255,255,255,0.8)', fontFamily: "OpenSans_Condensed-SemiBold", fontSize: 13, textAlign: 'center'}} numberOfLines={1}>{releasedOn}</Text>
                </View>
            </LinearGradient>
        </ImageBackground>
    </>
  )
}

export default RecentListAnimeImageBackground