import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Job } from '../../components/ListJobCard'
import React, { FC } from 'react'
import { IJob } from '../../constants/interface'

interface IProps {
  favouriteJobs: IJob[]
}

export const ListFavouritedScreen: FC<IProps> = ({ favouriteJobs }) => {
  return (
    <View>
      <FlatList
        data={favouriteJobs}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({ item, index }) => <Job job={item} key={index} />}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
