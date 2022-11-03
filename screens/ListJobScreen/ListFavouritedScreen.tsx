import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import { Job } from '../../components/ListJobCard'
import React, { FC } from 'react'
import { IJob } from '../../constants/interface'

interface IProps {
  favouriteJobs: IJob[]
}

export const ListFavouritedScreen: FC<IProps> = ({ favouriteJobs }) => {
  return (
    <View>
      {favouriteJobs?.length != 0 ? (
        <FlatList
          data={favouriteJobs}
          keyExtractor={(item, index) => item.title + index}
          renderItem={({ item, index }) => <Job job={item} key={index} />}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.container}>
          <Image source={require('../../assets/images/okay.png')} style={styles.icon} />
          <Text style={styles.text}>Bạn chưa lưu công việc nào hết!</Text>
          <Text style={styles.text}>Tìm kiếm và lưu lại để tìm hiểu kĩ hơn nhé!</Text>
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
