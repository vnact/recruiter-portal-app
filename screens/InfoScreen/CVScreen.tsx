import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import React, { useRef } from 'react'
import { grayColor, greenColor, redColor, whiteColor } from '../../constants/Colors'
import { AntDesign, Feather } from '@expo/vector-icons'
import InfoTagSceen from './InfoTagSceen'
import { useNavigation } from '@react-navigation/native'
const width = Dimensions.get('window').width
export default function CVScreen() {
  const scrollValue = useRef(new Animated.Value(0)).current
  const nav = useNavigation()
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
          <Text>Mô tả về bản thân</Text>
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
              <View style={styles.item}>
                <View style={styles.itemT}>
                  <Image source={require('../../assets/images/icon/education.png')} style={styles.icon} />
                  <View style={styles.item__info}>
                    <Text style={styles.item__text1}>Học Viện Kĩ Thuật Mật Mã</Text>
                    <Text style={styles.item__text2}>Công nghệ thông tin</Text>
                    <Text style={styles.item__text3}>9/2018 - Hiện Tại</Text>
                  </View>
                </View>
                <View style={styles.itemB}>
                  <Text style={styles.item__desc}>
                    Học viện Kỹ thuật Mật mã (tiếng Anh: Vietnam Academy of Cryptography Techniques) là một trường đại
                    học công lập trực thuộc Ban Cơ yếu Chính phủ, được thành lập ngày 17 tháng 2 năm 1995 có chức năng
                    đào tạo cán bộ có trình độ đại học, sau đại học và nghiên cứu khoa học kỹ thuật mật mã của ngành Cơ
                    yếu Việt Nam. Học viện cũng được chính phủ Việt Nam lựa chọn là một trong tám cơ sở trọng điểm đào
                    tạo nhân lực an toàn thông tin Việt Nam theo Đề án đào tạo và phát triển nguồn nhân lực an toàn, an
                    ninh thông tin đến năm 2025
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.list}>
              <View style={styles.item}>
                <View style={styles.itemT}>
                  <Image source={require('../../assets/images/icon/education.png')} style={styles.icon} />
                  <View style={styles.item__info}>
                    <Text style={styles.item__text1}>Học Viện Kĩ Thuật Mật Mã</Text>
                    <Text style={styles.item__text2}>Công nghệ thông tin</Text>
                    <Text style={styles.item__text3}>9/2018 - Hiện Tại</Text>
                  </View>
                </View>
                <View style={styles.itemB}>
                  <Text style={styles.item__desc}>
                    Học viện Kỹ thuật Mật mã (tiếng Anh: Vietnam Academy of Cryptography Techniques) là một trường đại
                    học công lập trực thuộc Ban Cơ yếu Chính phủ, được thành lập ngày 17 tháng 2 năm 1995 có chức năng
                    đào tạo cán bộ có trình độ đại học, sau đại học và nghiên cứu khoa học kỹ thuật mật mã của ngành Cơ
                    yếu Việt Nam. Học viện cũng được chính phủ Việt Nam lựa chọn là một trong tám cơ sở trọng điểm đào
                    tạo nhân lực an toàn thông tin Việt Nam theo Đề án đào tạo và phát triển nguồn nhân lực an toàn, an
                    ninh thông tin đến năm 2025
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.container__item}>
            <View style={styles.header}>
              <Text style={styles.title}>Kĩ năng</Text>
            </View>
            <View style={styles.list}>
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
                      Hãy thêm kĩ năng của bạn nhé !
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.container__item}>
            <View style={styles.header}>
              <Text style={styles.title}>Kinh nghiệm</Text>
            </View>
            <View style={styles.list}>
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
