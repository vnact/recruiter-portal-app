import { StyleSheet, View } from 'react-native'
import React from 'react'
import { RootTabScreenProps } from '../types'
import LottieView from 'lottie-react-native'
import { mainColor } from '../constants/Colors'

//TODO: make spinner
export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <LottieView source={require('../assets/intro/94295-loading-animation.json')} autoPlay loop />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColor,
    // opacity: 0.1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
