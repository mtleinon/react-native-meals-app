import React, { useCallback, useEffect } from 'react'
import { Image, View, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { ScrollView } from 'react-native-gesture-handler';
import TitleText from '../components/TitleText';
import DefaultText from '../components/DefaultText';
import Colors from '../constants/Colors';
import { toggleFavorite } from '../store/actions/meals';
import Chip from '../components/Chip';

const NumberedListView = ({ title, data }) => {
  return (
    <View style={styles.list}>
      <TitleText style={styles.listTitle}>{title}</TitleText>
      {data.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text style={styles.listNumber}>{index + 1}.</Text>
          <DefaultText>{item}</DefaultText>
        </View>
      ))}
    </View >
  )
};

const Chips = ({ meal }) => (
  <View style={styles.chips}>
    {meal.isGlutenFree && <Chip>GLUTEN FREE</Chip>}
    {meal.isLactoseFree && <Chip>LACTOSE FREE</Chip>}
    {meal.isVegan && <Chip>VEGAN</Chip>}
    {meal.isVegetarian && <Chip>VEGETARIAN</Chip>}
  </View>);

const MealDetailsScreen = (props) => {
  const mealId = props.navigation.getParam('mealId');
  const selectedMeal = useSelector(state => state.meals.meals).find(meal => meal.id === mealId);
  const isFavoriteMeal = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(
    () => {
      dispatch(toggleFavorite(mealId));
    },
    [dispatch, mealId]
  );

  useEffect(() => {
    props.navigation.setParams({ toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFavoriteMeal });
  }, [isFavoriteMeal]);

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      </View>
      <TitleText style={styles.titleText}>{selectedMeal.title}</TitleText>
      <View style={[styles.mealDetails]}>
        <DefaultText style={styles.mealDetailsText}>
          This {selectedMeal.affordability} meal is {selectedMeal.complexity} to make in {selectedMeal.duration} minutes.
        </DefaultText>
      </View>
      <Chips meal={selectedMeal} />
      <View style={styles.ingredients}>
        <NumberedListView title='Ingredients' data={selectedMeal.ingredients} />
      </View>
      <View style={styles.steps}>
        <NumberedListView title='Steps' data={selectedMeal.steps} />
      </View>
    </ScrollView >
  )
}

MealDetailsScreen.navigationOptions = navigationData => {
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const isFavoriteMeal = navigationData.navigation.getParam('isFavoriteMeal');

  const toggleFavoriteHandler = navigationData.navigation.getParam('toggleFavoriteHandler');
  return {
    headerTitle: mealTitle,
    headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Favorite"
        iconName={isFavoriteMeal ? "ios-star" : "ios-star-outline"}
        onPress={toggleFavoriteHandler}
      />
    </HeaderButtons>
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '96%',
    height: 200,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  titleText: {
    color: Colors.primaryColor,
    marginTop: 20,
    marginBottom: 5,
  },
  chips: {
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  ingredients: {
    marginTop: 10,
    backgroundColor: 'white',
  },
  steps: {
    marginTop: 15,
    backgroundColor: 'white'
  },
  list: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    borderColor: Colors.lightBorderColor,
    borderWidth: 1,
  },
  listTitle: {
    marginTop: 10,
    marginBottom: 5,
  },
  listItem: {
    flexDirection: 'row',
    padding: 5,
    width: '88%'
  },
  listNumber: {
    fontFamily: 'open-sans-bold',
    marginRight: 15,
    marginLeft: 15
  },
  mealDetails: {
    marginHorizontal: 50,
    marginVertical: 15,
  },
  mealDetailsText: {
    color: Colors.accentColor,
    fontSize: 15,
    textAlign: 'center'
  }
})

export default MealDetailsScreen