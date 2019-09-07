import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/meals";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:

      const mealIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
      // console.log('action', action, mealIndex);

      if (mealIndex >= 0) {
        return {
          ...state,
          favoriteMeals: [
            ...state.favoriteMeals.slice(0, mealIndex),
            ...state.favoriteMeals.slice(mealIndex + 1)
          ]
        };
      } else {
        return {
          ...state,
          favoriteMeals: [
            ...state.favoriteMeals,
            state.meals.find(meal => meal.id === action.mealId)
          ]
        }
      }
    case SET_FILTERS:
      return {
        ...state,
        filteredMeals: state.meals.filter(meal => {
          if (action.filters.isGlutenFree && !meal.isGlutenFree) {
            return false;
          }
          if (action.filters.isLactoseFree && !meal.isLactoseFree) {
            return false;
          }
          if (action.filters.isVegetarian && !meal.isVegetarian) {
            return false;
          }
          if (action.filters.isVegan && !meal.isVegan) {
            return false
          }
          return true;
        })
      }
    default:
      return state;
  }
}

export default mealsReducer;