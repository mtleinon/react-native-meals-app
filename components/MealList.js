import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import MealItem from './MealItem';

const MealList = props => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
  const renderMeal = ({ item }) => {
    const isFavoriteMeal = favoriteMeals.some(meal => meal.id === item.id);
    return <MealItem
      isFavoriteMeal={isFavoriteMeal}
      item={item}
      onPress={() => {
        props.navigation.navigate({
          routeName: 'MealDetail',
          params: {
            mealId: item.id,
            mealTitle: item.title,
            isFavoriteMeal
          }
        })
      }}
    />
  }

  return (
    <View style={styles.list}>
      <FlatList
        data={props.data}
        renderItem={renderMeal}
        style={{ width: '90%' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default MealList