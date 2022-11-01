import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Job } from '../../components/ListJobCard'
import React, { FC } from 'react'
import { IApplyJob, IJob } from '../../constants/interface'

interface IProps {
  applyJob: IJob[]
}

export const ListAppliedScreenFC: FC<IProps> = ({ applyJob }) => {
  return (
    <View>
      <FlatList
        data={applyJob}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({ item, index }) => <Job job={item} key={index} />}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
