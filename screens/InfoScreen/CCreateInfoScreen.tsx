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
  Alert,
} from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { blackColor, formColor, grayColor, mainColor, redColor, whiteColor } from '../../constants/Colors'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useNavigation } from '@react-navigation/native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import Layout from '../../constants/Layout'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { GetAllIndustryAction, selectIndustry, selectLoading } from '../../reducers/industrySlice'
import { EmploymentType, ExpLevel, ICareer, IIndustry, IUser } from '../../constants/interface'
import { GetAllCareerAction, selectCareers } from '../../reducers/careerSlice'
import BouncyCheckboxGroup, { ICheckboxButton } from 'react-native-bouncy-checkbox-group'
import { Picker } from '@react-native-picker/picker'
import { UpdateUserProfileAction } from '../../reducers/userSlice'

const width = Dimensions.get('window').width
export default function CCreateInfoScreen() {
  const dispatch = useAppDispatch()
  const [showPickDate, setShowPickDate] = useState(false)
  const nav = useNavigation()
  const scrollValue = useRef(new Animated.Value(0)).current
  const [keyword, setKeyWord] = useState('')

  const [name, setName] = useState<string | undefined>(undefined)
  const [gender, setGender] = useState<string | undefined>()
  const [careersPick, setCareersPick] = useState<{ name: string; id: number }[]>([])
  const [careersId, setcareersId] = useState<number[]>([])
  const [birthDay, setBirthDay] = useState<string | undefined>()
  const [height, setHeight] = useState<string | undefined>()
  const [weight, setWeight] = useState<string | undefined>()
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>()
  const [highSchool, setHighSchool] = useState<string | undefined>()
  const [familyRegisterNumber, setFamilyRegisterNumber] = useState<string | undefined>()
  const [identityCardNumber, setIdentityCardNumber] = useState<string | undefined>()
  const [hobby, setHobby] = useState<string | undefined>()
  const [character, setCharacter] = useState<string | undefined>()
  const [placeOfOrigin, setPlaceOfOrigin] = useState<string | undefined>()
  const [description, setDescription] = useState<string | undefined>()
  const [employmentSelect, setEmploymentSelect] = useState<EmploymentType>(EmploymentType.FullTime)
  const careerData = useAppSelector(selectCareers)

  const [modalCareerVisible, setModalCareerVisible] = useState(false)
  const [keywordCareer, setKeyWordCareer] = useState('')
  // const [career, setCareer] = useState<string | undefined>(undefined)
  const [idCareer, setIdCareer] = useState<number | undefined>()
  const [careerList, setCareerList] = useState<ICareer[] | undefined>(careerData)
  const dataCareerCompact = useAppSelector(selectCareers)?.filter((e) => e.parent == null)
  const dataCareerChild = useAppSelector(selectCareers)?.filter((e) => e.parent != null)
  const [employment_type, setEmployment_type] = useState<EmploymentType[]>([])
  const [level, setLevel] = useState<ExpLevel>(ExpLevel.NoExp)

  const typeEmployee = Object.keys(EmploymentType).map((name) => {
    return {
      name,
      value: EmploymentType[name as keyof typeof EmploymentType],
    }
  })
  const typeLevel = Object.keys(ExpLevel).map((name) => {
    return {
      name,
      value: ExpLevel[name as keyof typeof ExpLevel],
    }
  })
  const dataGender = [
    { id: 0, value: 'male', text: 'Nam' },
    { id: 1, value: 'female', text: 'Nữ' },
  ]
  // const fillterList = (key: string) => {
  //   setIndustriesList(dataIndustry?.filter((e) => e.name.includes(key)))
  // }
  // useEffect(() => {
  //   console.log(idIndustry)
  //   if (idIndustry) setCareerListCompact(careerList?.filter((e) => e.industry.id == idIndustry))
  // }, [idIndustry])
  // useEffect(() => {
  //   fillterList(keyword)
  // }, [keyword])
  useEffect(() => {
    Promise.all([dispatch(GetAllCareerAction())]).then((e) => {
      setCareerList(careerData)
    })
    // dispatch(GetAllIndustryAction())
    //     dispatch(GetAllCareerAction())
    // setIndustriesList(dataIndustry)
    // setCareerList(careerData)
    // console.log(JSON.stringify(careerData, null, '\t'))

    // console.log('1')
    // console.log(industriesList)
  }, [])
  const onSubmit = async () => {
    const payload: Partial<IUser> = {
      gender,
      level,
      name,
      birthDay,
      height: height ? parseInt(height) : undefined,
      weight: weight ? parseInt(weight) : undefined,
      phoneNumber,
      placeOfOrigin,
      identityCardNumber,
      highSchool,
      hobby,
      character,
      description,
      employmentType: employment_type,
      careersId,
    }
    await dispatch(UpdateUserProfileAction(payload))
    alert('Cập nhật thông tin thành công !')
    nav.goBack()
  }
  const fillterCareerList = (key: string) => {
    setCareerList(dataCareerCompact?.filter((e) => e.name.includes(key)))
  }
  useEffect(() => {
    fillterCareerList(keywordCareer)
  }, [keywordCareer])
  const checkParent = (id: number) => {
    return dataCareerChild?.filter((e) => e.parent?.id == id)[0] ? true : false
  }
  const findParent = (id: number) => {
    return dataCareerChild?.filter((e) => e.parent?.id == id)
  }
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
                value={name}
                onChangeText={setName}
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
                    {birthDay}
                  </Text>
                </View>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={showPickDate}
                mode="date"
                textColor={blackColor}
                isDarkModeEnabled={false}
                onConfirm={(date) => {
                  setBirthDay(moment(date).format('YYYY-MM-DD'))
                  setShowPickDate(false)
                }}
                onCancel={() => setShowPickDate(false)}
              />
            </View>
            <View style={styles.fieldFlex}>
              <View style={{ ...styles.field, width: 180 }}>
                <Text style={styles.label}>Chiều cao (cm)</Text>
                <TextInput
                  value={height}
                  onChangeText={setHeight}
                  placeholderTextColor={formColor}
                  placeholder="Chiều cao "
                  keyboardType="numeric"
                  style={styles.input}
                ></TextInput>
              </View>
              <View style={{ ...styles.field, width: 180 }}>
                <Text style={styles.label}>Cân nặng (kg)</Text>
                <TextInput
                  value={weight}
                  onChangeText={setWeight}
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
              <BouncyCheckboxGroup
                data={dataGender}
                onChange={(selectedItem: ICheckboxButton) => {
                  selectedItem.id == 0 ? setGender('male') : setGender('female')
                }}
              />
            </View>
            <View style={styles.fieldFlex}>
              <View style={{ ...styles.field, width: 180 }}>
                <Text style={styles.label}>
                  CMND/CCCD <Text style={styles.star}>*</Text>
                </Text>
                <TextInput
                  value={identityCardNumber}
                  onChangeText={setIdentityCardNumber}
                  placeholderTextColor={formColor}
                  placeholder="Nhập id của bạn"
                  keyboardType="default"
                  style={styles.input}
                ></TextInput>
              </View>
              <View style={{ ...styles.field, width: 180 }}>
                <Text style={styles.label}>
                  Số hộ khẩu<Text style={styles.star}>*</Text>
                </Text>
                <TextInput
                  value={familyRegisterNumber}
                  onChangeText={setFamilyRegisterNumber}
                  placeholderTextColor={formColor}
                  placeholder="Sổ hộ khẩu của bạn"
                  keyboardType="default"
                  style={styles.input}
                ></TextInput>
              </View>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>
                Trường trung học phổ thông <Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                value={highSchool}
                onChangeText={setHighSchool}
                placeholderTextColor={formColor}
                placeholder="Tên trường"
                style={styles.input}
              ></TextInput>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>
                Vị trí ứng tuyển <Text style={styles.star}>*</Text>
              </Text>
              {careersPick && careersPick.length != 0 ? (
                <View
                  style={{
                    // marginBottom: 15,
                    flexDirection: 'row',
                    maxWidth: Layout.window.width,
                    flexWrap: 'wrap',
                  }}
                >
                  {careersPick.map((e) => (
                    <TouchableOpacity
                      onPress={() => {
                        setCareersPick(careersPick.filter((element) => element.id != e.id))
                        setcareersId(careersId?.filter((element) => element != e.id))
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: mainColor,
                          borderRadius: 20,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingHorizontal: 10,
                          height: 40,
                          marginRight: 10,
                          marginBottom: 10,
                        }}
                      >
                        <Text style={{ color: whiteColor }}>{e.name}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <></>
              )}

              <TextInput
                editable={false}
                // value={career}
                onPressIn={() => {
                  setModalCareerVisible(true)
                  setKeyWordCareer('')
                }}
                placeholderTextColor={formColor}
                placeholder="Vị trí công việc"
                style={styles.input}
              ></TextInput>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>
                Loại hình <Text style={styles.star}>*</Text>
              </Text>
              {employment_type.length != 0 ? (
                <View
                  style={{
                    // marginBottom: 15,
                    flexDirection: 'row',
                    maxWidth: Layout.window.width,
                    flexWrap: 'wrap',
                  }}
                >
                  {employment_type.map((e) => (
                    <TouchableOpacity
                      onPress={() => {
                        setEmployment_type(employment_type.filter((element) => element != e))
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: mainColor,
                          borderRadius: 20,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingHorizontal: 10,
                          height: 40,
                          marginRight: 10,
                          marginBottom: 10,
                        }}
                      >
                        <Text style={{ color: whiteColor }}>{e}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <></>
              )}
              <Picker
                selectedValue={employmentSelect}
                onValueChange={(itemValue) => {
                  if (employment_type.filter((e) => e == itemValue).length == 0)
                    setEmployment_type([...employment_type, itemValue])
                  else if (employment_type) alert('Bạn đã chọn loại hình này rồi !')
                }}
              >
                {typeEmployee.map((e) => (
                  <Picker.Item label={e.name} value={e.value} />
                ))}
              </Picker>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>
                Kinh nghiệm <Text style={styles.star}>*</Text>
              </Text>
              <Picker selectedValue={level} onValueChange={(itemValue) => setLevel(itemValue)}>
                {typeLevel.map((e) => (
                  <Picker.Item label={e.name} value={e.value} />
                ))}
              </Picker>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>
                Địa chỉ <Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                value={placeOfOrigin}
                onChangeText={setPlaceOfOrigin}
                placeholderTextColor={formColor}
                placeholder="Địa chỉ hiện tại của bạn"
                style={styles.input}
              ></TextInput>
            </View>
            {/*
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
*/}
            <View style={styles.field}>
              <Text style={styles.label}>
                Số điện thoại <Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholderTextColor={formColor}
                placeholder="Số điện thoại của bạn"
                keyboardType="numeric"
                style={styles.input}
              ></TextInput>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Tính cách</Text>
              <TextInput
                value={character}
                onChangeText={setCharacter}
                placeholderTextColor={formColor}
                placeholder="Tính cách của bạn"
                style={styles.input}
              ></TextInput>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Sở thích</Text>
              <TextInput
                value={hobby}
                onChangeText={setHobby}
                placeholderTextColor={formColor}
                placeholder="Sở thích của bạn"
                style={styles.input}
              ></TextInput>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Mô tả chi tiết</Text>
              <TextInput
                multiline
                value={description}
                onChangeText={setDescription}
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
              <TouchableOpacity onPress={() => onSubmit()}>
                <View style={{ ...styles.submit, backgroundColor: '#50D890' }}>
                  <Text style={{ color: whiteColor, fontSize: 18 }}>Cập nhật</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalCareerVisible}
            onRequestClose={() => {
              setModalCareerVisible(!modalCareerVisible)
            }}
          >
            <View style={styles.modalView}>
              <View style={styles.top}>
                <TouchableOpacity
                  onPress={() => {
                    setModalCareerVisible(false)
                  }}
                >
                  <MaterialIcons name="arrow-back-ios" size={30} color={mainColor} />
                </TouchableOpacity>
                <TextInput
                  // autoFocus={true}
                  placeholder="Nhập vào từ khóa"
                  placeholderTextColor={formColor}
                  value={keywordCareer}
                  onChangeText={setKeyWordCareer}
                ></TextInput>
              </View>
              <View style={styles.list}>
                <ScrollView>
                  {careerList &&
                    careerList.map((e, key) => (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            if (checkParent(e.id)) {
                              setIdCareer(e.id)
                            } else {
                              setKeyWordCareer(e.name)
                              if (careersId?.filter((el) => el == e.id).length == 0) {
                                careersPick
                                  ? setCareersPick([...careersPick, { name: e.name, id: e.id }])
                                  : setCareersPick([{ name: e.name, id: e.id }])
                                careersId ? setcareersId([...careersId, e.id]) : setcareersId([e.id])
                                console.log(careersId)
                                setModalCareerVisible(false)
                              } else if (careersId) {
                                console.log(careersId)
                                alert('Bạn đã chọn vị trí này rồi!')
                              }
                            }
                          }}
                        >
                          <View>
                            <View style={styles.item} key={key}>
                              <Text style={{ fontSize: 18 }}>{e.name}</Text>
                              {checkParent(e.id) ? (
                                <View
                                  style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    backgroundColor: mainColor,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Text style={{ color: whiteColor }}>{findParent(e.id)?.length}</Text>
                                </View>
                              ) : (
                                <></>
                              )}
                            </View>
                          </View>
                        </TouchableOpacity>
                        {e.id == idCareer && checkParent(e.id) && (
                          <TouchableOpacity
                            onPress={() => {
                              setKeyWordCareer(e.name)
                              if (careersId?.filter((el) => el == e.id).length == 0) {
                                careersPick
                                  ? setCareersPick([...careersPick, { name: e.name, id: e.id }])
                                  : setCareersPick([{ name: e.name, id: e.id }])
                                careersId ? setcareersId([...careersId, e.id]) : setcareersId([e.id])
                                // console.log(careersId)
                                setModalCareerVisible(false)
                              } else if (careersId) {
                                // console.log(careersId)
                                alert('Bạn đã chọn vị trí này rồi!')
                              }
                            }}
                          >
                            <View style={styles.itemChild} key={key}>
                              <Text style={{ fontSize: 18 }}>{e.name}</Text>
                            </View>
                          </TouchableOpacity>
                        )}
                        {e.id == idCareer &&
                          findParent(e.id)?.map((e) => (
                            <TouchableOpacity
                              onPress={() => {
                                setKeyWordCareer(e.name)
                                if (careersId?.filter((el) => el == e.id).length == 0) {
                                  careersPick
                                    ? setCareersPick([...careersPick, { name: e.name, id: e.id }])
                                    : setCareersPick([{ name: e.name, id: e.id }])
                                  careersId ? setcareersId([...careersId, e.id]) : setcareersId([e.id])
                                  console.log(careersId)
                                  setModalCareerVisible(false)
                                } else if (careersId) {
                                  console.log(careersId)
                                  alert('Bạn đã chọn vị trí này rồi!')
                                }
                              }}
                            >
                              <View style={styles.itemChild} key={key}>
                                <Text style={{ fontSize: 18 }}>{e.name}</Text>
                              </View>
                            </TouchableOpacity>
                          ))}
                      </View>
                    ))}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  itemChild: {
    paddingHorizontal: 40,
    borderBottomWidth: 0.2,
    backgroundColor: grayColor,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  list: {},
  item: {
    paddingHorizontal: 15,
    borderBottomWidth: 0.2,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
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
