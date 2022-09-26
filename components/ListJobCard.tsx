import { FlatList, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { Button } from '@rneui/themed'
import { primaryColor } from '../constants/Colors'
const width = Dimensions.get('window').width

interface IJob {
  name: string
  name_company: string
  salary: number
  location: string
  level: string
  created_at: string
}

interface IJobProps {
  item: IJob
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

const Job: FC<IJobProps> = ({ item }) => {
  return (
    <TouchableOpacity>
      <View style={styles.job}>
        <View style={styles.companyHeader}>
          <View style={styles.logo}>
            <Image
              source={{
                uri: 'https://cdn.topcv.vn/80/company_logos/295f6a316d2959a4c890dd2a55f606e8-604996d0c88d6.jpg',
              }}
              style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 10 }}
            />
          </View>
          <View style={styles.infoCompany}>
            <Text style={styles.nameJob}>{item.name}</Text>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <Text style={styles.address}>{item.name_company}</Text>
              <Text style={styles.salary}>${item.salary}/Mo</Text>
            </View>
          </View>
        </View>
        <View style={styles.jobDetail}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Feather name="map-pin" size={18} style={{ marginRight: 5 }} color="#6E6D7A" />
              <Text style={styles.address}>{item.location}</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 30,
              }}
            >
              <Feather name="briefcase" size={18} style={{ marginRight: 5 }} color="#6E6D7A" />
              <Text style={styles.address}>{item.level}</Text>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <MaterialIcons name="fiber-manual-record" />
            <Text>{item.created_at}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
export const ListJobCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Suggested Job</Text>
        <MaterialIcons name="more-horiz" size={26} />
      </View>
      <View style={styles.body}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item, index }) => <Job item={item} key={index} />}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  job: {
    marginBottom: 20,
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  body: {
    marginBottom: 50,
  },
  companyHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  infoCompany: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    justifyContent: 'space-around',
    flex: 1,
  },
  nameJob: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  address: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6E6D7A',
  },
  jobDetail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {},
  salary: {
    fontSize: 18,
    fontWeight: '500',
    color: `${primaryColor}`,
    textAlign: 'right',
  },
})
