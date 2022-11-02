import { Button, FlatList, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { FC } from 'react'
import { Job, ListJobCard } from '../../components/ListJobCard'
import { IJob } from '../../constants/interface'
import { RootStackScreenProps } from '../../types'

export const SearchResultScreen: FC<RootStackScreenProps<'SearchResult'>> = ({ route }) => {
  const jobs = route.params?.jobs
  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <Job job={item} key={index} />}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
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
