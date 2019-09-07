import React from 'react'
import { Text, StyleSheet } from 'react-native'

const TitleText = props => {
  return (
    <Text style={[props.style, styles.text]}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    fontSize: 17
  }
});
export default TitleText