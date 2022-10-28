import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Job } from '../../components/ListJobCard'
import React from 'react'
interface IJob {
  name: string
  name_company: string
  salary: number
  location: string
  level: string
  created_at: string
}

const data: IJob[] = [
  {
    name: 'Google Developer',
    name_company: 'Google',
    salary: 10,
    location: 'Ha noi',
    level: 'Junior',
    created_at: '3d',
  },
  {
    name: 'Google Developer',
    name_company: 'Google',
    salary: 10,
    location: 'Ha noi',
    level: 'Junior',
    created_at: '3d',
  },
  {
    name: 'Google Developer',
    name_company: 'Google',
    salary: 10,
    location: 'Ha noi',
    level: 'Junior',
    created_at: '3d',
  },
  {
    name: 'Google Developer',
    name_company: 'Google',
    salary: 10,
    location: 'Ha noi',
    level: 'Junior',
    created_at: '3d',
  },
  {
    name: 'Google Developer',
    name_company: 'Google',
    salary: 10,
    location: 'Ha noi',
    level: 'Junior',
    created_at: '3d',
  },
]
export default function ListAppliedScreen() {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item, index }) => <Job item={item} key={index} />}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
