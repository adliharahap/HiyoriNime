import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import StarIcon from '../../assets/Icons/StarIcon'
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/Icons/BackIcon';

const HeaderDetailComponent = ({toggleFavorite, isFavorite}) => {
    const navigation = useNavigation();
  return (
    <View style={styles.header}>
        <TouchableOpacity
        onPress={() => {
            navigation.goBack();
        }}>
        <BackIcon size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <StarIcon size={16} />
        <Text style={styles.favoriteText}>
            {isFavorite ? 'Remove From Favorite' : 'Add To Favorite'}
        </Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1C16',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 30,
  },
  favoriteText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    paddingLeft: 5,
    fontFamily: 'OpenSans_SemiCondensed-Bold',
  },
});

export default HeaderDetailComponent