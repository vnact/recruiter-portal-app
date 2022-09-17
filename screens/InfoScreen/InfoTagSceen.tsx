import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { whiteColor } from '../../constants/Colors'

export default function InfoTagSceen() {
  return (
    <View style={styles.container__item}>
      <View style={styles.header}>
        <Text style={styles.title}>Học vấn</Text>
        <Feather name="edit-2" size={20} color="#576CD6" />
      </View>
      <View style={styles.list}>
        <View style={styles.item}>
          <Image source={require('../../assets/images/icon/education.png')} style={styles.icon} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container__item: {
    overflow: 'visible',
    marginHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#CFE8A9',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  list: {
    flex: 1,
    backgroundColor: whiteColor,
    minHeight: 110,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  icon: {
    height: 80,
    width: 80,
  },
  item: {
    height: 110,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
