import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { grayColor, greenColor, redColor, whiteColor } from '../../constants/Colors'
import { AntDesign, Feather } from '@expo/vector-icons'
import InfoTagSceen from './InfoTagSceen'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { GetSelfAction, selectUser } from '../../reducers/userSlice'
import { EmploymentType } from '../../constants/interface'
const width = Dimensions.get('window').width
export default function CVScreen() {
  const scrollValue = useRef(new Animated.Value(0)).current
  const nav = useNavigation()
  const dispatch = useAppDispatch()
  const dataUser = useAppSelector(selectUser)
  useEffect(() => {
    dispatch(GetSelfAction())
  }, [])
  const typeEmployee = new Map()
  Object.keys(EmploymentType).map((name) => {
    typeEmployee.set(EmploymentType[name as keyof typeof EmploymentType], name)
  })
  return (
    <View style={styles.container}>
      <View style={{ height: 150 }}>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-vector/colorful-watercolor-rainbow-background_125540-151.jpg?w=2000',
          }}
          style={styles.image__cover}
        />
        <Animated.Image
          source={{
            uri: 'https://vn-test-11.slatic.net/p/75cfa1c8f23c46a47483127a5f7dfdf4.jpg_800x800Q100.jpg',
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
          {/* {dataUser.?} */}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '200',
          }}
        >
          {dataUser?.email}
        </Text>

        <View
          style={{
            borderTopWidth: 0.2,
            width: width,
            alignItems: 'center',
            marginTop: 5,
            minHeight: 50,
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
        <View style={{ flex: 1, width: width, backgroundColor: '#EEEEEE' }}>
          <View style={styles.container__item}>
            <View style={styles.header}>
              <Text style={styles.title}>Học vấn</Text>
            </View>
            <View style={styles.list}>
              {dataUser?.educations && dataUser.educations.length != 0 ? (
                dataUser.educations.map((e) => (
                  <View style={styles.item}>
                    <View style={styles.itemT}>
                      <Image source={require('../../assets/images/icon/education.png')} style={styles.icon} />
                      <View style={styles.item__info}>
                        <Text style={styles.item__text1}>{e.school}</Text>
                        <Text style={styles.item__text2}>{e.fieldOfStudy}</Text>
                        <Text style={styles.item__text3}>
                          {e.isCompleted ? e.startTime + ' - ' + e.endTime : e.startTime + ' - Hiện Tại'}
                        </Text>
                      </View>
                    </View>
                    {e.description && (
                      <View style={styles.itemB}>
                        <Text style={styles.item__desc}>{e.description}</Text>
                      </View>
                    )}
                  </View>
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
                      Người ứng tuyển chưa thêm !
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={styles.container__item}>
            <View style={styles.header}>
              <Text style={styles.title}>Kĩ năng</Text>
            </View>
            <View style={styles.list}>
              {dataUser?.skills && dataUser.skills.length != 0 ? (
                dataUser.skills.map((e) => (
                  <View style={styles.item}>
                    <View style={styles.itemT}>
                      <Image source={require('../../assets/images/icon/certificate.png')} style={styles.icon} />
                      <View style={styles.item__info}>
                        <Text style={styles.item__text1}>{e.skill.name}</Text>
                        <Text style={styles.item__text2}>{e.certificate}</Text>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.item}>
                  <View style={styles.itemT}>
                    <Image source={require('../../assets/images/icon/certificate.png')} style={styles.icon} />
                    <View style={styles.item__info}>
                      <Text
                        style={{
                          ...styles.item__text1,
                          fontWeight: '100',
                          fontStyle: 'italic',
                        }}
                      >
                        Người ứng tuyển chưa thêm kĩ năng!
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={styles.container__item}>
            <View style={styles.header}>
              <Text style={styles.title}>Kinh nghiệm</Text>
            </View>
            <View style={styles.list}>
              {dataUser?.experiences && dataUser.experiences.length != 0 ? (
                dataUser.experiences.map((e) => (
                  <View style={styles.item}>
                    <View style={styles.itemT}>
                      <Image source={require('../../assets/images/icon/experience.png')} style={styles.icon} />
                      <View style={styles.item__info}>
                        <Text style={styles.item__text1}>{e.company.name}</Text>
                        <Text style={styles.item__text2}>
                          {e.career.name + ' - ' + typeEmployee.get(e.employmentType)}
                        </Text>
                        <Text style={styles.item__text3}>{e.startDate + ' - ' + e.endDate}</Text>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.item}>
                  <View style={styles.itemT}>
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
    height: 150,
    resizeMode: 'stretch',
  },
  view__info__basic: {
    // top: -75,
    // paddingTop: 75,
    alignItems: 'center',
    paddingBottom: 5,
    borderBottomWidth: 10,
    borderColor: grayColor,
  },

  container__item: {
    backgroundColor: whiteColor,
    overflow: 'scroll',
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
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
    paddingVertical: 10,
    // height: 100,
    paddingHorizontal: 15,
    // flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  itemT: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemB: {
    paddingTop: 10,
  },
  item__desc: {
    textAlign: 'justify',
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
