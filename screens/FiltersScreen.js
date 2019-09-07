import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Switch, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import TitleText from '../components/TitleText';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals';

const LabeledSwitch = ({ label, value, onValueChange }) => {
  return (
    <View style={styles.filterContainer} >
      <Text>{label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
        value={value} onValueChange={onValueChange} />
    </View >
  );
}

const FiltersScreen = ({ navigation }) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const filters = {
      isGlutenFree,
      isLactoseFree,
      isVegan,
      isVegetarian
    };
    dispatch(setFilters(filters))
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    navigation.setParams({ saveFilters });
  }, [saveFilters])

  return (
    <View style={styles.screen}>
      <TitleText style={styles.title}>Available Filters / Restrictions</TitleText>
      <LabeledSwitch label='Gluten-free'
        value={isGlutenFree} onValueChange={setIsGlutenFree} />
      <LabeledSwitch label='Lactose-free'
        value={isLactoseFree} onValueChange={setIsLactoseFree} />
      <LabeledSwitch label='Vegan'
        value={isVegan} onValueChange={setIsVegan} />
      <LabeledSwitch label='Vegetarian'
        value={isVegetarian} onValueChange={setIsVegetarian} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    marginTop: 10,
    marginBottom: 5
  },
  filterContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    borderBottomColor: Colors.lightBorderColor,
    borderBottomWidth: 1,
  }

})

FiltersScreen.navigationOptions = navData => {
  return ({
    headerTitle: 'Filter Meals',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={() => {
          navData.navigation.toggleDrawer();
        }} />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Save" iconName="ios-save"
          onPress={navData.navigation.getParam('saveFilters')} />
      </HeaderButtons>
    )
  })
};

export default FiltersScreen