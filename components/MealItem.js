import React from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DefaultText from './DefaultText';
import Icon from 'react-native-vector-icons/Ionicons';

const MealItem = ({ isFavoriteMeal, item, onPress }) => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={onPress}>
        <View>
          <View style={[styles.mealRow, styles.mealHeader]}>
            <ImageBackground source={{ uri: item.imageUrl }}
              style={styles.backgroundImage} >
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              </View>
              {isFavoriteMeal && <Icon style={styles.icon} name="ios-star" size={30} color="white" />}
            </ImageBackground>
          </View>
          <View style={[styles.mealRow, styles.mealDetails]}>
            <DefaultText>{item.duration}m</DefaultText>
            <DefaultText>{item.complexity.toUpperCase()}</DefaultText>
            <DefaultText>{item.affordability.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#eee',
    marginTop: 10,
    borderRadius: 7,
    overflow: 'hidden'
  },
  backgroundImage: {
    flexDirection: 'column-reverse',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between'

  },
  icon: {
    alignSelf: 'flex-end',
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: 'rgba(0,0,0,.4)',
    borderRadius: 7,
  },
  mealRow: {
    flexDirection: 'row'
  },
  mealHeader: {
    height: '85%'
  },
  mealDetails: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%'
  },
  //IOS need this for setting the background color
  titleContainer: {
    paddingVertical: 3,
    paddingHorizontal: 9,
    backgroundColor: 'rgba(0,0,0,.4)',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  }
});
export default MealItem