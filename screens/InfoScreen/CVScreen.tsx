import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { grayColor, greenColor, redColor, whiteColor } from '../../constants/Colors'
import { AntDesign, Feather } from '@expo/vector-icons'
import InfoTagSceen from './InfoTagSceen'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { GetSelfAction, selectUser } from '../../reducers/userSlice'
import { EmploymentType, ExpLevel } from '../../constants/interface'
import moment from 'moment'
const width = Dimensions.get('window').width
export default function CVScreen() {
  const scrollValue = useRef(new Animated.Value(0)).current
  const nav = useNavigation()
  const dispatch = useAppDispatch()
  const dataUser = useAppSelector(selectUser)
  useEffect(() => {
    dispatch(GetSelfAction())
  }, [])
  const typeLevel = new Map()
  Object.keys(ExpLevel).map((name) => {
    typeLevel.set(ExpLevel[name as keyof typeof ExpLevel], name)
  })
  const typeEmployee = new Map()
  Object.keys(EmploymentType).map((name) => {
    typeEmployee.set(EmploymentType[name as keyof typeof EmploymentType], name)
  })
  return (
    <View style={styles.container}>
      <View style={{ height: 180 }}>
        <Image
          source={{
            uri: 'https://vcdn1-giaitri.vnecdn.net/2022/02/23/buc-starry-night-1645604173-7559-1645604348.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=GsqrC7WG5K97gnbHpxyqYw',
          }}
          style={styles.image__cover}
        />
        <Animated.Image
          source={{
            uri:
              dataUser?.avatar ||
              'https://vn-test-11.slatic.net/p/75cfa1c8f23c46a47483127a5f7dfdf4.jpg_800x800Q100.jpg',
          }}
          style={{
            ...styles.image__avatar,
            width: scrollValue.interpolate({
              inputRange: [0, 100],
              outputRange: [150, 100],
              extrapolate: 'clamp',
            }),
            height: scrollValue.interpolate({
              inputRange: [0, 100],
              outputRange: [150, 100],
              extrapolate: 'clamp',
            }),
            top: scrollValue.interpolate({
              inputRange: [0, 100],
              outputRange: [-75, -110],
              extrapolate: 'clamp',
            }),
            left: scrollValue.interpolate({
              inputRange: [0, 100],
              outputRange: [0, -150],
              extrapolate: 'clamp',
            }),
          }}
        />
      </View>
      <Animated.View
        style={{
          ...styles.view__info__basic,
          overflow: 'hidden',
          paddingTop: scrollValue.interpolate({
            inputRange: [0, 100],
            outputRange: [75, 15],
            extrapolate: 'clamp',
          }),
          //   op`acity: scrollValue.interpolate({
          //     inputRange: [0, 100],
          //     outputRange: [1, 0],
          //     extrapolate: 'clamp',
          //   }),`
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 5,
          }}
        >
          {dataUser?.name}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '400',
            marginBottom: 5,
          }}
        >
          Email: {dataUser?.email}
        </Text>
        {dataUser?.phoneNumber && (
          <Text
            style={{
              fontSize: 15,
              fontWeight: '400',
              marginBottom: 5,
            }}
          >
            S??T: {dataUser?.phoneNumber}
          </Text>
        )}
        {dataUser?.employmentType?.length != 0 && (
          <Text
            style={{
              fontSize: 15,
              fontWeight: '400',
              marginBottom: 5,
            }}
          >
            Lo???i h??nh: {dataUser?.employmentType?.map((e) => typeEmployee.get(e) + ',')}
          </Text>
        )}
        {dataUser?.level && (
          <Text
            style={{
              fontSize: 15,
              fontWeight: '400',
              marginBottom: 5,
            }}
          >
            Kinh nghi???m: {typeLevel.get(dataUser?.level)}
          </Text>
        )}
        {dataUser?.careers?.length != 0 && (
          <Text
            style={{
              fontSize: 15,
              fontWeight: '400',
              marginBottom: 5,
            }}
          >
            V?? tr?? ???ng tuy???n: {dataUser?.careers?.map((e) => e.name + ',')}
          </Text>
        )}
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
          <Text>{dataUser?.description}</Text>
        </View>
      </Animated.View>
      <ScrollView
        style={{ backgroundColor: '#EEEEEE' }}
        onScroll={(e) => {
          scrollValue.setValue(e.nativeEvent.contentOffset.y)
        }}
        scrollEventThrottle={16}
      >
        <View style={{ flex: 1, width: width, backgroundColor: whiteColor }}>
          <View style={styles.container__item}>
            <View style={styles.header}>
              <Text style={styles.title}>H???c v???n</Text>
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
                            : moment(e.startTime).format('DD/MM/YYYY') + ' - Hi???n t???i'}
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
                      Ng?????i ???ng tuy???n ch??a th??m m???c n??y!
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={styles.container__item}>
            <View style={styles.header}>
              <Text style={styles.title}>K?? n??ng</Text>
            </View>
            <View style={styles.list}>
              {dataUser?.skills && dataUser.skills.length != 0 ? (
                dataUser.skills.map((e) => (
                  <TouchableOpacity onPress={() => nav.navigate('CCreateSkill', { id: e.skill.id })}>
                    <View style={styles.item}>
                      <Image source={require('../../assets/images/icon/certificate.png')} style={styles.icon} />
                      <View style={styles.item__info}>
                        <Text style={styles.item__text1}>{e.skill.name}</Text>
                        <Text style={styles.item__text2}>{e.description}</Text>
                      </View>
                      {e.certificate && (
                        <View>
                          <Image
                            source={{ uri: e.certificate }}
                            style={{
                              height: 70,
                              width: 50,
                              borderRadius: 10,
                              borderWidth: 0.5,
                            }}
                          />
                        </View>
                      )}
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
                      Ng?????i ???ng tuy???n ch??a th??m m???c n??y!
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={styles.container__item}>
            <View style={styles.header}>
              <Text style={styles.title}>Kinh nghi???m</Text>
            </View>
            <View style={styles.list}>
              {dataUser?.experiences && dataUser?.experiences.length != 0 ? (
                dataUser.experiences.map((e) => (
                  <TouchableOpacity onPress={() => nav.navigate('CCreateExp', { id: e.id })}>
                    <View style={styles.item}>
                      <Image source={{ uri: e.company.avatar }} style={styles.icon} />
                      <View style={styles.item__info}>
                        <Text style={styles.item__text1}>{e.company.name}</Text>
                        {/* <Text style={styles.item__text2}>{e.company.address}</Text> */}
                        <Text style={styles.item__text2}>
                          {e.career.name + ' - ' + typeEmployee.get(e.employmentType)}
                        </Text>
                        {/* <Text style={styles.item__text2}>{typeEmployee.get(e.employmentType)}</Text> */}
                        <Text style={styles.item__text3}>
                          {moment(e.startDate).format('DD/MM/YYYY') + ' - ' + moment(e.endDate).format('DD/MM/YYYY')}
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
                      Ng?????i ???ng tuy???n ch??a th??m m???c n??y!
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
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
    // zIndex: 100,
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
    height: 180,
    resizeMode: 'stretch',
  },
  view__info__basic: {
    // top: -75,
    // paddingTop: 75,
    alignItems: 'center',
    paddingBottom: 5,
    borderBottomWidth: 10,
    borderColor: whiteColor,
  },

  container__item: {
    marginBottom: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#1C2833',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: whiteColor,
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
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
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
