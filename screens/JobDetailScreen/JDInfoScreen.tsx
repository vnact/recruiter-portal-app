import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { blackColor, formColor, mainColor, whiteColor } from '../../constants/Colors'
import MapView, { Marker, Callout } from 'react-native-maps'
import { AntDesign } from '@expo/vector-icons'
import * as Location from 'expo-location'
import MapViewDirections from 'react-native-maps-directions'
import { IJob } from '../../constants/interface'
import Constants from 'expo-constants'

interface IProps {
  job: IJob
}
interface ILocation {
  latitude: number
  longitude: number
}

export const JDInfoScreen: FC<IProps> = ({ job }) => {
  const [isShow, setShow] = useState(false)
  const initialRegion = { latitude: 20.98714, longitude: 105.783, latitudeDelta: 0.01, longitudeDelta: 0.01 }
  const [destination, setDestination] = useState<ILocation | null>({
    // latitude: 21.030090156796025,
    // longitude: 105.77648383059098,
    latitude: job.company.gpsLat,
    longitude: job.company.gpsLng,
  })
  const [distance, setDistance] = useState<any>()
  const [duration, setDuration] = useState<any>()

  const [origin, setOrigin] = useState<ILocation | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const traceRouteOnReady = (arg: any) => {
    if (arg) {
      setDistance(arg.distance)
      setDuration(arg.duration)
    }
  }
  const desc: string[] = [job.description]
  const request: string[] = [
    'Có kinh nghiệm 1 năm trở lên trong vai trò Fullstack Engineer',
    'Thông thạo một trong các ngôn ngữ, framework (Python: FastAPI; ES6: NextJS, NuxtJS; Database: Postgresql, ElasticSearch)',
    'Yêu thích làm việc với dữ liệu và xử lý dữ liệu lớn (ETL Data, Data Pipeline, ElasticSearch, PostgreSQL, MySQL).',
    'Siêu lợi thế: Có kinh nghiệm xây dựng, tối ưu sản phẩm đáp ứng lượng truy cập lớn.',
    'Kỹ năng giải quyết vấn đề mức tốt trở lên.',
    'Thành thạo HTML, CSS, Javascript và có kinh nghiệm lập trình với các framework frontend (VueJS, NuxtJS, React, v.v.)',
    'Kiên trì, tỉ mỉ, mưu cầu tiến bộ.',
  ]
  const benifit: string[] = [
    '13 tháng lương, thỏa thuận theo năng lực: 15-35 triệu/ tháng (NET).',
    'Hỗ trợ ăn trưa, vé xe (~1 triệu/ tháng).',
    'Tháng lương 13 chia theo quý, kèm thưởng của công ty.',
    'Chế độ BHXH, BHYT, nghỉ phép theo quy định của nhà nước.',
    'Cơ hội phát triển sự nghiệp rõ ràng: đã có plan sản phẩm 5 năm, còn để mở các vị trí chủ chốt.',
    'Môi trường đồng nghiệp giỏi (năng lực, kinh nghiệm top 1% lĩnh vực) + văn hoá hỗ trợ nhau tiến bộ trong công ty.',
  ]
  useEffect(() => {}, [])
  const getLocation = async () => {
    // const { status } = Location.requestForegroundPermissionsAsync()

    // if (status !== 'granted') {
    //   console.log(status)
    //   return
    // }
    setLoading(true)
    let location = await Location.getCurrentPositionAsync({})
    setLoading(false)
    console.log('loaction is ' + location.coords.latitude)
    console.log('loaction is ' + location.coords.longitude)
    setOrigin({ latitude: location.coords.latitude, longitude: location.coords.longitude })
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.boxInfo}>
          <Text style={styles.boxTitle}>Thông tin chung</Text>
          <View style={!isShow ? styles.listHide : styles.listShow}>
            <View style={styles.item}>
              <View style={styles.boxIcon}>
                <Image source={require('../../assets/images/icon/salary-icon.png')} style={styles.icon} />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTitle}>Mức lương :</Text>
                <Text style={styles.itemContent}>2.000 $</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={styles.boxIcon}>
                <Image source={require('../../assets/images/icon/suitcase-icon.png')} style={styles.icon} />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTitle}>Hình thức làm việc :</Text>
                {job.workplaces.map((item, index) => (
                  <Text key={index} style={styles.itemContent}>
                    {item}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.item}>
              <View style={styles.boxIcon}>
                <Image source={require('../../assets/images/icon/people-icon.png')} style={styles.icon} />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTitle}>Số lượng cân tuyển :</Text>
                <Text style={styles.itemContent}>{job.recruits + 5} người</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={styles.boxIcon}>
                <Image source={require('../../assets/images/icon/gender-icon.png')} style={styles.icon} />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTitle}>Giới tính :</Text>
                <Text style={styles.itemContent}>Không yêu cầu</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={styles.boxIcon}>
                <Image source={require('../../assets/images/icon/medal-icon.png')} style={styles.icon} />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTitle}>Kinh nghiệm :</Text>
                <Text style={styles.itemContent}>Không yêu cầu kinh nghiệm</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={styles.boxIcon}>
                <Image source={require('../../assets/images/icon/role-icon.png')} style={styles.icon} />
              </View>
              <View style={{ ...styles.itemRight, flexDirection: 'row' }}>
                <Text style={styles.itemTitle}>Chức vụ :</Text>
                {job.employmentType.map((item, index) => (
                  <Text key={index} style={styles.itemContent}>
                    {item}{' '}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.item}>
              <View style={styles.boxIcon}>
                <Image source={require('../../assets/images/icon/location-icon.png')} style={styles.icon} />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true)
                }}
              >
                <View style={styles.itemRight}>
                  <Text style={styles.itemTitle}>Địa chỉ :</Text>
                  <Text style={styles.itemContent}>{job.company.address}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => setShow(!isShow)}>
            <Text
              style={{
                textAlign: 'center',
                paddingVertical: 15,
                fontSize: 20,
                color: mainColor,
              }}
            >
              {isShow ? 'Thu gọn' : 'Xem thêm'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boxDesc}>
          <Text style={styles.boxTitle}>Thông tin chung</Text>
          {desc.map((e, i) => (
            <Text style={{ fontSize: 15, fontWeight: '300', textAlign: 'justify', paddingBottom: 8 }} key={i}>
              {'\u25CF' + '  '}
              {e}
            </Text>
          ))}
        </View>
        <View style={styles.boxRequest}>
          <Text style={styles.boxTitle}>Yêu cầu ứng viên</Text>
          {request.map((e, i) => (
            <Text style={{ fontSize: 15, fontWeight: '300', textAlign: 'justify', paddingBottom: 8 }} key={i}>
              {'\u25CF' + '  '}
              {e}
            </Text>
          ))}
        </View>
        <View style={styles.boxBenifit}>
          <Text style={styles.boxTitle}>Quyền lợi</Text>
          {benifit.map((e, i) => (
            <Text style={{ fontSize: 15, fontWeight: '300', textAlign: 'justify', paddingBottom: 8 }} key={i}>
              {'\u25CF' + '  '}
              {e}
            </Text>
          ))}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <MapView style={styles.map} initialRegion={initialRegion} provider="google">
              {destination && (
                <Marker coordinate={destination}>
                  <Callout>
                    <Text>Vị trí công ty</Text>
                  </Callout>
                </Marker>
              )}
              {origin && (
                <Marker
                  coordinate={{ latitude: 20.98714, longitude: 105.783 }}
                  // icon={require('../../assets/images/icon/marker-icon.png')}
                >
                  <Callout>
                    <Text>Vị trí của bạn</Text>
                  </Callout>
                </Marker>
              )}
              {origin && destination && (
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  apikey={Constants?.manifest?.extra?.googleApiKey}
                  strokeWidth={3}
                  strokeColor="hotpink"
                  onReady={traceRouteOnReady}
                />
              )}
            </MapView>
            {isLoading && <ActivityIndicator size="large" animating={true} style={styles.loading} color={mainColor} />}
            <View style={styles.actionModal}>
              <TouchableOpacity style={styles.buttonLocation} onPress={() => getLocation()}>
                {/* <View style={{ ...styles.buttonLocation, marginRight: 0 }}> */}
                <Text
                  style={{
                    color: whiteColor,
                    fontSize: 16,
                  }}
                >
                  Chỉ đường
                </Text>
                {/* </View> */}
              </TouchableOpacity>
              <Pressable
                style={{
                  shadowColor: blackColor,
                  shadowOffset: { width: 2, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 4,
                  elevation: 4,
                }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <AntDesign name="closecircle" size={30} color={mainColor} />
              </Pressable>
            </View>
            {distance && duration && (
              <View
                style={{
                  backgroundColor: mainColor,
                  paddingHorizontal: 15,
                  borderRadius: 8,
                  position: 'absolute',
                  bottom: 15,
                  paddingVertical: 5,
                  width: '85%',
                  shadowColor: blackColor,
                  shadowOffset: { width: 2, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 4,
                  elevation: 4,
                }}
              >
                <Text style={{ color: whiteColor, fontSize: 16 }}>Quãng đường di chuyển :{distance.toFixed(2)} km</Text>
                <Text style={{ color: whiteColor, fontSize: 16 }}>Thời gian di chuyển :{Math.ceil(duration)} min</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loading: { position: 'absolute', height: '100%' },
  buttonLocation: {
    shadowColor: blackColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 10,
    backgroundColor: mainColor,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  actionModal: {
    justifyContent: 'flex-start',
    marginTop: 15,
    marginRight: 15,
    position: 'absolute',
    flexDirection: 'row',
    // width: '85%',
    right: 0,
    padding: 8,
    // shadowColor: blackColor,
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 4,
    // elevation: 4,
    // borderRadius: 8,
    // backgroundColor: whiteColor,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  map: {
    width: Dimensions.get('window').width - 30,
    height: 600,
  },
  modalView: {
    // margin: 20,
    // paddingHorizontal:20,
    backgroundColor: whiteColor,
    borderRadius: 20,
    overflow: 'hidden',
    // padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    // flex: 1,
    marginTop: 20,
  },
  boxDesc: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    // maxHeight: 520,
    backgroundColor: '#FAFAFA',
    borderRadius: 15,
    marginTop: 20,
  },
  boxRequest: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    // maxHeight: 520,
    backgroundColor: '#FAFAFA',
    borderRadius: 15,
    marginTop: 20,
  },
  boxBenifit: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    // maxHeight: 520,
    backgroundColor: '#FAFAFA',
    borderRadius: 15,
    marginTop: 20,
  },
  boxInfo: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    // maxHeight: 520,
    backgroundColor: '#FAFAFA',
    borderRadius: 15,
    // overflow: 'hidden',
  },
  boxTitle: {
    fontSize: 20,
    height: 40,
  },
  listHide: {
    height: 180,
    overflow: 'hidden',
  },
  listShow: {},
  item: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  boxIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#C7F0DB',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  itemRight: {
    flex: 1,
    marginHorizontal: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: formColor,
    paddingBottom: 10,
  },
  itemTitle: {
    height: 25,
    color: '#5C5757',
    fontSize: 16,
  },

  itemContent: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
})
