import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { formColor, grayColor, greenColor, whiteColor } from '../../constants/Colors'
import { AntDesign, Entypo, Feather } from '@expo/vector-icons'
import InfoTagSceen from './InfoTagSceen'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../app/hook'
const width = Dimensions.get('window').width
export default function InfoCandidateScreen() {
  const nav = useNavigation()
  const dispatch = useAppDispatch()
  // const dataUser=useAppSelector(selectData)
  useEffect(() => {})
  return (
    <View style={styles.container}>
      <View style={{ height: 150 }}>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-vector/colorful-watercolor-rainbow-background_125540-151.jpg?w=2000',
          }}
          style={styles.image__cover}
        />
        <Image
          source={{
            uri: 'https://vn-test-11.slatic.net/p/75cfa1c8f23c46a47483127a5f7dfdf4.jpg_800x800Q100.jpg',
          }}
          style={styles.image__avatar}
        />
      </View>
      <View style={styles.view__info__basic}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 5,
          }}
        >
          Bea Suzy
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '400',
            marginBottom: 5,
          }}
        >
          Ca sĩ, Diễn viên
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '200',
          }}
        >
          KMA
        </Text>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: -65,
            right: 20,
          }}
          onPress={() => nav.navigate('CCreateInfo')}
        >
          <Feather name="edit-2" size={20} color="#576CD6" />
        </TouchableOpacity>
        <View
          style={{
            borderTopWidth: 0.2,
            width: width,
            alignItems: 'center',
            marginTop: 5,
            height: 50,
            justifyContent: 'center',
          }}
        >
          <Text>Mô tả về bản thân</Text>
        </View>
      </View>
      <ScrollView style={{ backgroundColor: '#EEEEEE' }}>
        <View style={{ flex: 1, width: width, backgroundColor: '#EEEEEE' }}>
          <View style={styles.container__item}>
            <View style={styles.header}>
              <Text style={styles.title}>Học vấn</Text>
              <TouchableOpacity onPress={() => nav.navigate('CCreateEducation')}>
                <AntDesign name="pluscircleo" size={20} color="#576CD6" />
              </TouchableOpacity>
            </View>
            <View style={styles.list}>
              <View style={styles.item}>
                <Image source={require('../../assets/images/icon/education.png')} style={styles.icon} />
                <View style={styles.item__info}>
                  <Text style={styles.item__text1}>Học Viện Kĩ Thuật Mật Mã</Text>
                  <Text style={styles.item__text2}>Công nghệ thông tin</Text>
                  <Text style={styles.item__text3}>9/2018 - Hiện Tại</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.container__item}>
            <View style={styles.header}>
              <Text style={styles.title}>Kĩ năng</Text>
              <TouchableOpacity onPress={() => nav.navigate('CCreateSkill')}>
                <AntDesign name="pluscircleo" size={20} color="#576CD6" />
              </TouchableOpacity>
            </View>
            <View style={styles.list}>
              <View style={styles.item}>
                <Image source={require('../../assets/images/icon/certificate.png')} style={styles.icon} />
                <View style={styles.item__info}>
                  <Text
                    style={{
                      ...styles.item__text1,
                      fontWeight: '100',
                      fontStyle: 'italic',
                    }}
                  >
                    Hãy thêm kĩ năng của bạn nhé !
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.container__item}>
            <View style={styles.header}>
              <Text style={styles.title}>Kinh nghiệm</Text>
              <TouchableOpacity onPress={() => nav.navigate('CCreateExp')}>
                <AntDesign name="pluscircleo" size={20} color="#576CD6" />
              </TouchableOpacity>
            </View>
            <View style={styles.list}>
              <View style={styles.item}>
                <Image source={require('../../assets/images/icon/experience.png')} style={styles.icon} />
                <View style={styles.item__info}>
                  <Text
                    style={{
                      ...styles.item__text1,
                      fontWeight: '100',
                      fontStyle: 'italic',
                    }}
                  >
                    Hãy thêm thông tin về kinh nghiệm của bạn nhé !
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => nav.navigate('CVSScreen')}>
        <Entypo
          name="info-with-circle"
          size={40}
          color="#576CD6"
          style={{
            bottom: 30,
            position: 'absolute',
            right: 30,
          }}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  image__avatar: {
    top: -75,
    zIndex: 100,
    width: 150,
    height: 150,
    resizeMode: 'stretch',
    borderRadius: 75,
    borderWidth: 5,
    borderColor: whiteColor,
    alignSelf: 'center',
  },
  image__cover: {
    width: width,
    height: 150,
    resizeMode: 'stretch',
  },
  view__info__basic: {
    // top: -75,
    marginTop: 75,
    alignItems: 'center',
    paddingBottom: 5,
    borderBottomWidth: 10,
    borderColor: grayColor,
  },

  container__item: {
    marginBottom: 10,
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
    // flex: 1,
    // paddingTop: 10,
    backgroundColor: whiteColor,
    minHeight: 100,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  icon: {
    height: 80,
    width: 80,
  },
  item: {
    height: 100,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  item__info: {
    paddingHorizontal: 10,
    flex: 1,
  },
  item__text1: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item__text2: {
    fontSize: 15,
    fontWeight: '500',
    color: greenColor,
  },
  item__text3: {
    fontSize: 15,
    fontWeight: '300',
    color: greenColor,
  },
})
