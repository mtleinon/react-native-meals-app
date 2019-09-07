import React from 'react'
import { Platform, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const CategoryGridTile = (props) => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={{ ...styles.gridItemOutlook, backgroundColor: props.color }} >
      <TouchableComponent
        style={styles.gridItemTouch}
        onPress={props.onPress}
      >
        <View style={styles.gridItemContent}>
          <Text style={styles.title} numberOfLines={2} >
            {props.title}
          </Text>
        </View>
      </TouchableComponent>
    </View >
  )
}

const styles = StyleSheet.create({
  gridItemOutlook: {
    flex: 1,
    borderRadius: 10,
    // For gribble effect
    overflow: Platform.OS === 'android' && Platform.Version >= 21
      ? 'hidden'
      : 'visible',
    margin: 15,
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  gridItemTouch: {
    flex: 1,
  },
  gridItemContent: {
    flex: 1,
    height: 150,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
    textAlign: 'right'
  }
});
export default CategoryGridTile