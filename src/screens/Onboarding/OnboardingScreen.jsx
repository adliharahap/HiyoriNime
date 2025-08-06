import { View, Text, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native'
import React from 'react'
import Carousel from "../../components/Carousel";
const { width: screenWidth } = Dimensions.get('window');
const ImagePage1 = require('../../assets/Images/OnboardingImage/Page1.jpg');
const ImagePage2 = require('../../assets/Images/OnboardingImage/Page10.png');
const ImagePage3 = require('../../assets/Images/OnboardingImage/Page9.png');
const ImagePage4 = require('../../assets/Images/OnboardingImage/Page7.png');

const OnboardingScreen = () => {
  return (
    <View style={{flex: 1}}>
        <Carousel>
            <Page1 />
            <Page2 />
            <Page3 />
            <Page4 />
        </Carousel>
    </View>
  )
}

const Page1 = () => {
    return (
        <View style={[styles.page, { backgroundColor: '#fff', flex: 1 }]}>
            <ImageBackground source={ImagePage1} style={{flex: 1,width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}></ImageBackground>
        </View>
    )
}

const Page2 = () => {
    return (
        <View style={[styles.page, { backgroundColor: '#fff', flex: 1 }]}>
            <Image source={ImagePage2} style={{flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', }}></Image>
        </View>
    )
}

const Page3 = () => {
    return (
        <View style={[styles.page, { backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
            <Image source={ImagePage3} style={{flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}></Image>
        </View>
    )
}

const Page4 = () => {
    return (
        <View style={[styles.page, { backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
            <Image source={ImagePage4} style={{flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width: screenWidth,
    alignItems: 'center'
  },
});

export default OnboardingScreen