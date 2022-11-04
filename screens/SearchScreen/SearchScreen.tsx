import { Button, FlatList, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { FC } from 'react'
import { Job } from '../../components/ListJobCard'
import { RootStackScreenProps } from '../../types'
import { useAppSelector } from '../../app/hook'
import { selectLoading, selectSearchedJobs } from '../../reducers/jobSlice'
import SplashScreen from '../SplashScreen'
import { Image } from '@rneui/base'

export const SearchResultScreen: FC<RootStackScreenProps<'SearchResult'>> = () => {
  const jobs = useAppSelector(selectSearchedJobs)
  const loading = useAppSelector(selectLoading)

  if (loading === 'loading') {
    return <SplashScreen />
  }

  return (
    <View style={styles.container}>
      {jobs.length > 0 ? (
        <FlatList
          data={jobs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <Job job={item} key={index} />}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.container}>
          <Image source={require('../../assets/images/oops.png')} style={styles.icon} />
          <Text style={styles.text}>Không có kết quả cho tìm kiếm của bạn!</Text>
        </View>
      )}
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
  icon: {
    height: 150,
    width: 150,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
  },
})
