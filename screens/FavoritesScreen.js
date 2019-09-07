import React from 'react'
import { StyleSheet, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

import MealList from '../components/MealList';
import { useSelector } from 'react-redux';
import DefaultText from '../components/DefaultText';

const FavoritesScreen = props => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

  if (!favoriteMeals || favoriteMeals.length === 0) {
    return <View style={styles.screen}>
      <DefaultText >
        No favorite meals set yet. Start adding some!
      </DefaultText>
    </View>
  }
  return (
    <MealList data={favoriteMeals} navigation={props.navigation} />
  )
}

FavoritesScreen.navigationOptions = navData => {
  return ({
    headerTitle: 'Your Favorites',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={() => {
          navData.navigation.toggleDrawer();
        }} />
      </HeaderButtons>
    )
  })
};




const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
export default FavoritesScreen