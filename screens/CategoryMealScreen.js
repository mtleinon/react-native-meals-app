import React from 'react'
import { View, StyleSheet } from 'react-native'
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';
import { useSelector } from 'react-redux';

const CategoryMealScreen = (props) => {
  const categoryId = props.navigation.getParam('categoryId');

  const displayedMeals = useSelector(state => state.meals.filteredMeals)
    .filter(meal => meal.categoryId.includes(categoryId));

  if (!displayedMeals || displayedMeals.length === 0) {
    return <View style={styles.screen}>
      <DefaultText >
        No Meals found in the category.
        Please check your filter settings if this category
        should contain meals.
      </DefaultText>
    </View>
  }

  return <MealList
    data={displayedMeals}
    navigation={props.navigation}
  />
}

CategoryMealScreen.navigationOptions = navigationData => {
  const categoryId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(category => category.id === categoryId);

  return ({
    headerTitle: selectedCategory.title,
  });

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  }
})
export default CategoryMealScreen