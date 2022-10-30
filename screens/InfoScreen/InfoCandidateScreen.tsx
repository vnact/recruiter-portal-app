import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { formColor, grayColor, greenColor, whiteColor } from '../../constants/Colors'
import { AntDesign, Entypo, Feather } from '@expo/vector-icons'
import InfoTagSceen from './InfoTagSceen'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { GetSelfAction, selectUser } from '../../reducers/userSlice'
import moment from 'moment'
const width = Dimensions.get('window').width
export default function InfoCandidateScreen() {
  const nav = useNavigation()
  const dispatch = useAppDispatch()
  const dataUser = useAppSelector(selectUser)
  console.log(dataUser?.skills)
  useEffect(() => {
    dispatch(GetSelfAction())
    // console.log('ádasd')
    // console.log(dataUser?.skills[0])
  }, [])
  const log = () => {
    console.log(JSON.stringify(dataUser, null, '\t'))
  }
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
              <TouchableOpacity onPress={() => nav.navigate('CCreateEducation', {})}>
                <AntDesign name="pluscircleo" size={20} color="#576CD6" />
              </TouchableOpacity>
            </View>
            <View style={styles.list}>
              {dataUser?.educations && dataUser?.educations.length != 0 ? (
                dataUser.educations.map((e) => (
                  <TouchableOpacity onPress={() => nav.navigate('CCreateEducation', { id: e.id })}>
                    <View style={styles.item}>
                      <Image source={require('../../assets/images/icon/education.png')} style={styles.icon} />
                      <View style={styles.item__info}>
                        <Text style={styles.item__text1}>{e.school}</Text>
                        <Text style={styles.item__text2}>{e.fieldOfStudy}</Text>
                        <Text style={styles.item__text3}>
                          {e.isCompleted
                            ? moment(e.startTime).format('DD/MM/YYYY') + ' - ' + moment(e.endTime).format('DD/MM/YYYY')
                            : moment(e.startTime).format('DD/MM/YYYY') + ' - Hiện tại'}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.item}>
                  <Image source={require('../../assets/images/icon/education.png')} style={styles.icon} />
                  <View style={styles.item__info}>
                    <Text
                      style={{
                        ...styles.item__text1,
                        fontWeight: '100',
                        fontStyle: 'italic',
                      }}
                    >
                      Hãy thêm học vấn của bạn
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={styles.container__item}>
            <View style={styles.header}>
              <Text style={styles.title}>Kĩ năng</Text>
              <TouchableOpacity onPress={() => nav.navigate('CCreateSkill', {})}>
                <AntDesign name="pluscircleo" size={20} color="#576CD6" />
              </TouchableOpacity>
            </View>
            <View style={styles.list}>
              {dataUser?.skills && dataUser.skills.length != 0 ? (
                dataUser.skills.map((e) => (
                  <TouchableOpacity onPress={() => nav.navigate('CCreateSkill', { id: e.skill.id })}>
                    <View style={styles.item}>
                      <Image source={require('../../assets/images/icon/certificate.png')} style={styles.icon} />
                      <View style={styles.item__info}>
                        <Text style={styles.item__text1}>{e.skill.name}</Text>
                        <Text style={styles.item__text2}>{e.certificate}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
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
              )}
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
              {dataUser?.experiences && dataUser?.experiences.length != 0 ? (
                dataUser.experiences.map((e) => (
                  <TouchableOpacity onPress={() => nav.navigate('CCreateExp')}>
                    <View style={styles.item}>
                      <Image source={require('../../assets/images/icon/experience.png')} style={styles.icon} />
                      <View style={styles.item__info}>
                        <Text style={styles.item__text1}>{e.company.name}</Text>
                        {/* <Text style={styles.item__text2}>{e.company.address}</Text> */}
                        <Text style={styles.item__text2}>{e.career.name}</Text>
                        <Text style={styles.item__text2}>{e.employmentType}</Text>
                        <Text style={styles.item__text3}>
                          {moment(e.start_date).format('DD/MM/YYYY') + ' - ' + moment(e.end_date).format('DD/MM/YYYY')}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
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
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => log()}>
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
