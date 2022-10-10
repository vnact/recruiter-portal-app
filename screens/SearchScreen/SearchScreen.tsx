import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListJobCard } from '../../components/ListJobCard'

export const SearchScreen = () => {
  return (
    <View style={styles.container}>   
      <ListJobCard title="14 Jobs Available" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FDFDFD',
  },
})
