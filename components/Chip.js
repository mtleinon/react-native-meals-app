import React from 'react'
import { View, StyleSheet } from 'react-native'
import DefaultText from './DefaultText';
import Colors from '../constants/Colors';

const Chip = ({ children }) => {
  return (
    <View style={styles.chip}>
      <DefaultText style={styles.text}>{children}</DefaultText>
    </View>
  )
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: Colors.accentColor,
    margin: 5,
  },
  text: {
    color: Colors.primaryColor
  }
})

export default Chip