import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  Modal,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { blackColor, formColor, grayColor, mainColor, redColor, whiteColor } from '../../constants/Colors'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useNavigation } from '@react-navigation/native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import Layout from '../../constants/Layout'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { GetAllIndustryAction, selectIndustry, selectLoading } from '../../reducers/industrySlice'
import { IIndustry } from '../../constants/interface'
import { GetAllCareerAction, selectCareers } from '../../reducers/careerSlice'

const width = Dimensions.get('window').width
export default function CCreateInfoScreen() {
  const dispatch = useAppDispatch()
  const [date, setDate] = useState(new Date())
  const [modalVisible, setModalVisible] = useState(false)
  const [showPickDate, setShowPickDate] = useState(false)
  const nav = useNavigation()
  const scrollValue = useRef(new Animated.Value(0)).current
  const [keyword, setKeyWord] = useState('')
  const [gender, setGender] = useState(null)
  const [industry, setIndustry] = useState<string | undefined>(undefined)
  const [career, setCareer] = useState<string | undefined>(undefined)
  const careerData = useAppSelector(selectCareers)
  const [dateBirth, setDateBirth] = useState('Ngày sinh của bạn')
  const loading = useAppSelector(selectLoading)
  const dataIndustry = useAppSelector(selectIndustry)
  const [modalCareerVisible, setModalCareerVisible] = useState(false)
  const [showCareer, setShowCareer] = useState(false)
  // let industriesList = dataIndustry
  let [industriesList, setIndustriesList] = useState<IIndustry[] | undefined>(dataIndustry)
  const fillterList = (key: string) => {
    console.log(key)
    setIndustriesList(dataIndustry?.filter((e) => e.name.includes(key)))
    console.log(industriesList)
  }
  useEffect(() => {
    dispatch(GetAllIndustryAction())
    dispatch(GetAllCareerAction())
    // console.log('1')
    // console.log(industriesList)
  }, [])
  useEffect(() => {
    fillterList(keyword)
  }, [keyword])
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Animated.View
          style={{
            height: scrollValue.interpolate({
              inputRange: [0, 100],
              outputRange: [225, 150],
              extrapolate: 'clamp',
            }),
            backgroundColor: whiteColor,
            // position: 'relative',
          }}
        >
          <Image
            source={{
              uri: 'https://img.freepik.com/free-vector/colorful-watercolor-rainbow-background_125540-151.jpg?w=2000',
            }}
            style={styles.image__cover}
          />

          {/* <TouchableOpacity> */}
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
              // position: 'relative',
              // zIndex: 100,
            }}
          />
          {/* </TouchableOpacity> */}
          <TouchableOpacity>
            <Animated.View
              style={{
                width: 34,
                height: 34,
                backgroundColor: '#576CD6',
                borderRadius: 17,
                justifyContent: 'center',
                alignItems: 'center',
                // position: 'absolute',
                // zIndex: 100,
                // top: 45,

                // left: 230,
                top: scrollValue.interpolate({
                  inputRange: [0, 100],
                  outputRange: [-110, -140],
                  extrapolate: 'clamp',
                }),
                left: scrollValue.interpolate({
                  inputRange: [0, 100],
                  outputRange: [230, 70],
                  extrapolate: 'clamp',
                }),
              }}
            >
              <Entypo name="camera" size={20} color={whiteColor} />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
        <ScrollView
          onScroll={(e) => {
            scrollValue.setValue(e.nativeEvent.contentOffset.y)
          }}
          scrollEventThrottle={16}
        >
          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>
                Họ và tên <Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                placeholderTextColor={formColor}
                placeholder="Họ và tên của bạn"
                style={styles.input}
              ></TextInput>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>
                Ngày sinh <Text style={styles.star}>*</Text>
              </Text>
              <TouchableOpacity onPress={() => setShowPickDate(true)}>
                <View style={{ ...styles.input, justifyContent: 'center' }}>
                  <Text
                    style={{
                      color: formColor,
                      fontWeight: '200',
                      fontSize: 16,
                    }}
                  >
                    {dateBirth}
                  </Text>
                </View>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={showPickDate}
                mode="date"
                textColor={blackColor}
                isDarkModeEnabled={false}
                onConfirm={(date) => {
                  setDateBirth(moment(date).format('DD/MM/YYYY'))
                  setShowPickDate(false)
                }}
                onCancel={() => setShowPickDate(false)}
              />
            </View>
            <View style={styles.fieldFlex}>
              <View style={{ ...styles.field, width: 180 }}>
                <Text style={styles.label}>Chiều cao (cm)</Text>
                <TextInput
                  placeholderTextColor={formColor}
                  placeholder="Chiều cao "
                  keyboardType="numeric"
                  style={styles.input}
                ></TextInput>
              </View>
              <View style={{ ...styles.field, width: 180 }}>
                <Text style={styles.label}>Cân nặng (kg)</Text>
                <TextInput
                  placeholderTextColor={formColor}
                  placeholder="Cân nặng"
                  keyboardType="numeric"
                  style={styles.input}
                ></TextInput>
              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>
                Giới tính <Text style={styles.star}>*</Text>
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <BouncyCheckbox
                  size={22}
                  fillColor={redColor}
                  unfillColor="#FFFFFF"
                  text="Nam"
                  iconStyle={{ borderColor: 'red' }}
                  innerIconStyle={{ borderWidth: 2 }}
                  style={{
                    marginTop: 15,
                  }}
                  textStyle={{
                    textDecorationLine: 'none',
                    // fontFamily: 'JosefinSans-Regular',
                    color: blackColor,
                    fontWeight: '200',
                    fontSize: 16,
                  }}
                  onPress={(isChecked: boolean) => {
                    // setStudying(isChecked);
                  }}
                />
                <BouncyCheckbox
                  size={22}
                  fillColor={redColor}
                  unfillColor="#FFFFFF"
                  text="Nữ"
                  iconStyle={{ borderColor: 'red' }}
                  innerIconStyle={{ borderWidth: 2 }}
                  style={{
                    marginTop: 15,
                    marginLeft: 40,
                  }}
                  textStyle={{
                    textDecorationLine: 'none',
                    // fontFamily: 'JosefinSans-Regular',
                    color: blackColor,
                    fontWeight: '200',
                    fontSize: 16,
                  }}
                  onPress={(isChecked: boolean) => {
                    // setStudying(isChecked);
                  }}
                />
              </View>
            </View>
            <View style={styles.fieldFlex}>
              <View style={{ ...styles.field, width: 180 }}>
                <Text style={styles.label}>
                  CMND/CCCD <Text style={styles.star}>*</Text>
                </Text>
                <TextInput
                  placeholderTextColor={formColor}
                  placeholder="Nhập id của bạn"
                  keyboardType="numeric"
                  style={styles.input}
                ></TextInput>
              </View>
              <View style={{ ...styles.field, width: 180 }}>
                <Text style={styles.label}>
                  Số hộ khẩu<Text style={styles.star}>*</Text>
                </Text>
                <TextInput
                  placeholderTextColor={formColor}
                  placeholder="Sổ hộ khẩu của bạn"
                  keyboardType="default"
                  style={styles.input}
                ></TextInput>
              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>
                Ngành nghề ứng tuyển <Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                editable={false}
                onPressIn={() => {
                  setModalVisible(true)
                }}
                value={industry}
                placeholderTextColor={formColor}
                placeholder="Ngành nghề bạn ứng tuyển"
                style={styles.input}
              ></TextInput>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>
                Vị trí <Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                editable={false}
                value={career}
                onPressIn={() => {
                  setModalCareerVisible(true)
                }}
                placeholderTextColor={formColor}
                placeholder="Vị trí công việc"
                style={styles.input}
              ></TextInput>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>
                Địa chỉ <Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                placeholderTextColor={formColor}
                placeholder="Địa chỉ hiện tại của bạn"
                style={styles.input}
              ></TextInput>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>
                Email liên lạc <Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                placeholderTextColor={formColor}
                placeholder="Email liên lạc của bạn"
                style={styles.input}
              ></TextInput>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>
                Số điện thoại <Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                placeholderTextColor={formColor}
                placeholder="Số điện thoại của bạn"
                keyboardType="numeric"
                style={styles.input}
              ></TextInput>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Tính cách</Text>
              <TextInput
                placeholderTextColor={formColor}
                placeholder="Tính cách của bạn"
                style={styles.input}
              ></TextInput>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Sở thích</Text>
              <TextInput
                placeholderTextColor={formColor}
                placeholder="Sở thích của bạn"
                style={styles.input}
              ></TextInput>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Mô tả chi tiết</Text>
              <TextInput
                multiline
                placeholderTextColor={formColor}
                placeholder="Mô tả về bạn"
                style={{ ...styles.input, height: 150 }}
              ></TextInput>
            </View>
            <View style={styles.formSubmit}>
              <TouchableOpacity>
                <TouchableOpacity onPress={() => nav.goBack()}>
                  <View style={styles.submit}>
                    <Text style={{ color: whiteColor, fontSize: 18 }}>Hủy bỏ</Text>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={{ ...styles.submit, backgroundColor: '#50D890' }}>
                  <Text style={{ color: whiteColor, fontSize: 18 }}>Thêm mới</Text>
                </View>
              </TouchableOpacity>
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
            <View style={styles.modalView}>
              <View style={styles.top}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false)
                    setShowCareer(true)
                  }}
                >
                  <MaterialIcons name="arrow-back-ios" size={30} color={mainColor} />
                </TouchableOpacity>
                <TextInput
                  autoFocus={true}
                  placeholder="Nhập vào từ khóa"
                  placeholderTextColor={formColor}
                  value={keyword}
                  onChangeText={setKeyWord}
                ></TextInput>
              </View>
              <View style={styles.list}>
                {industriesList &&
                  industriesList.map((e, key) => (
                    <TouchableOpacity
                      onPress={() => {
                        setIndustry(e.name)
                        setModalVisible(false)
                      }}
                    >
                      <View style={styles.item} key={key}>
                        <Text style={{ fontSize: 18 }}>{e.name}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  list: {},
  item: { paddingHorizontal: 15, borderBottomWidth: 0.2, height: 50, justifyContent: 'center' },
  top: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    paddingBottom: 10,
  },
  modalView: {
    paddingTop: 55,
    width: Layout.window.width,
    height: Layout.window.height,
    backgroundColor: whiteColor,
  },
  formSubmit: {
    flexDirection: 'row',
    // bottom: 50,
    // position: 'absolute',
    width: 370,
    marginHorizontal: 15,
    justifyContent: 'space-around',
    height: 70,
    alignItems: 'center',
  },
  submit: {
    backgroundColor: redColor,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  submitText: {},
  fieldFlex: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  form: {
    // marginTop: 85,
    paddingHorizontal: 15,
    flex: 1,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: whiteColor,
  },
  image__avatar: {
    // top: -75,
    // position: 'absolute',
    // zIndex: 1,
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
  field: {},
  label: {
    fontSize: 20,
    paddingVertical: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 16,
    fontWeight: '200',
    paddingHorizontal: 15,
    borderColor: formColor,
  },
  star: { color: redColor },
})
