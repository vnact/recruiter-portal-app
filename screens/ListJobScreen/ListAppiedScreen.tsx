import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import { Job } from '../../components/ListJobCard'
import React, { FC } from 'react'
import { IJob } from '../../constants/interface'

interface IProps {
  applyJob: IJob[]
}

export const ListAppliedScreenFC: FC<IProps> = ({ applyJob }) => {
  return (
    <View>
      {applyJob?.length != 0 ? (
        <FlatList
          data={applyJob}
          keyExtractor={(item, index) => item.title + index}
          renderItem={({ item, index }) => <Job job={item} key={index} />}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.container}>
          <Image source={require('../../assets/images/oops.png')} style={styles.icon} />
          <Text style={styles.text}>Bạn chưa ứng tuyển!</Text>
          <Text style={styles.text}>Ứng tuyển ngay để có cơ hội phát triển nhé!</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
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
