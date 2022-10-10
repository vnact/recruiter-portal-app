import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

export default function TabTwoScreen() {
  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
