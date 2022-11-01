import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { blackColor, formColor, redColor, whiteColor } from '../../constants/Colors'
// import { FastField, Field, Form, Formik } from 'formik'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import {
  CreateEducationAction,
  DeleteEducationAction,
  GetOneEducationAction,
  selectingEducation,
  UpdateEducationAction,
} from '../../reducers/educationSlice'
import { RootStackScreenProps } from '../../types'
// interface MyFormValues {
//   school: string | null
//   major: string | null
//   timeStart: string | null
//   timeEnd: string | null
//   description: string | null
// }
const width = Dimensions.get('window').width
export const CCreateEducationScreen: React.FC<RootStackScreenProps<'CCreateEducation'>> = ({ route }) => {
  const dispatch = useAppDispatch()
  const nav = useNavigation()
  const { id } = route.params
  useEffect(() => {
    if (id) {
      dispatch(GetOneEducationAction({ id }))
    }
  }, [])
  const educationData = useAppSelector(selectingEducation)
  useEffect(() => {
    if (educationData && id) {
      educationData.endTime && setDateEnd(educationData.endTime)
      setDateStart(educationData.startTime)
      educationData.description && setDesc(educationData.description)
      setFiled(educationData.fieldOfStudy)
      setSchool(educationData.school)
      setStudying(!educationData.isCompleted)
    }
  }, [educationData])

  const [showPickDate, setShowPickDate] = useState(false)
  const [dateStart, setDateStart] = useState<string | undefined>()
  const [dateEnd, setDateEnd] = useState<string | undefined>()
  const [studying, setStudying] = useState(false)
  const [school, setSchool] = useState<string | undefined>()
  const [field, setFiled] = useState<string | undefined>()
  const [desc, setDesc] = useState<string | undefined>()
  // const [working, setWorking] = useState(undefined)
  const [whatTime, setWhatTime] = useState<string | undefined>()
  // const initialValues: MyFormValues = {
  //   school: null,
  //   major: null,
  //   timeEnd: null,
  //   timeStart: null,
  //   description: null,
  // }
  const onDelete = () => {
    Alert.alert('Cảnh báo', 'Bạn có muốn xóa không ?', [
      {
        text: 'Cancel',
        onPress: () => nav.goBack(),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          if (id) {
            await dispatch(DeleteEducationAction({ id }))
            alert('Xóa thành công')
            nav.goBack()
          }
        },
      },
    ])
  }
  const onSubmit = async () => {
    if (dateStart && school && field) {
      let payload = {
        id: id || undefined,
        school,
        fieldOfStudy: field,
        startTime: dateStart,
        endTime: dateEnd || undefined,
        isCompleted: !studying,
        description: desc,
      }
      if (id) {
        await dispatch(UpdateEducationAction(payload))
        alert('Cập nhật thành công')
        nav.goBack()
      } else {
        await dispatch(CreateEducationAction(payload))
        alert('Tạo thành công')
        nav.goBack()
        // if (studying) delete payload['endTime']
        // studying && delete payload['endTime']
        // console.log(payload)
      }
    }
  }
  return (
    // <Formik initialValues={initialValues} onSubmit={(values) => {}}>
    //   {(formikProps) => {
    //     return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => nav.goBack()}>
            <View style={styles.header__icon}>
              <Ionicons name="chevron-back-outline" size={30} color="black" />
            </View>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingRight: 40,
            }}
          >
            <Text style={styles.header__title}>Học vấn</Text>
          </View>
        </View>
        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>
              Trường <Text style={styles.star}>*</Text>
            </Text>
            <TextInput
              placeholderTextColor={formColor}
              placeholder="Tên Trường"
              style={styles.input}
              value={school}
              onChangeText={setSchool}
            ></TextInput>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>
              Chuyên ngành <Text style={styles.star}>*</Text>
            </Text>
            {/* <TouchableOpacity onPress={() => setModalVisible(true)}> */}
            <TextInput
              value={field}
              onChangeText={setFiled}
              placeholderTextColor={formColor}
              placeholder="VD: Công nghệ thông tin"
              style={styles.input}
              // onPressIn={() => setModalVisible(true)}
            />
            {/* </TouchableOpacity> */}
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>
              Thời gian <Text style={styles.star}>*</Text>
            </Text>
            <View style={styles.boxFieldTime}>
              <View style={!studying ? styles.fieldTime : styles.fieldTimeFull}>
                <Text style={styles.labelTime}>Bắt đầu</Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowPickDate(true)
                    setWhatTime('start')
                  }}
                >
                  <View style={!studying ? styles.inputTime : styles.inputTimeFull}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '200',
                        color: formColor,
                      }}
                    >
                      {dateStart}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {!studying ? (
                <View style={styles.fieldTime}>
                  <Text style={styles.labelTime}>Kết thúc</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowPickDate(true)
                      setWhatTime('end')
                    }}
                  >
                    <View style={styles.inputTime}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '200',
                          color: formColor,
                        }}
                      >
                        {dateEnd}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                ''
              )}
            </View>
            <DateTimePickerModal
              isVisible={showPickDate}
              mode="date"
              // textColor={blackColor}
              // accentColor={blackColor}
              // isDarkModeEnabled={false}
              onConfirm={(date) => {
                if (whatTime == 'start') {
                  setDateStart(moment(date).format('YYYY-MM-DD'))
                } else setDateEnd(moment(date).format('YYYY-MM-DD'))
                setShowPickDate(false)
              }}
              onCancel={() => setShowPickDate(false)}
            />
          </View>
          <BouncyCheckbox
            isChecked={studying}
            size={22}
            fillColor={redColor}
            unfillColor="#FFFFFF"
            text="Tôi đang học ở đây"
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
              setStudying(isChecked)
            }}
          />
          <View style={styles.field}>
            <Text style={styles.label}>Mô tả chi tiết</Text>
            <TextInput
              value={desc}
              onChangeText={setDesc}
              multiline
              placeholderTextColor={formColor}
              placeholder="Tên Trường"
              style={{ ...styles.input, height: 150 }}
            ></TextInput>
          </View>
          <View style={styles.formSubmit}>
            <TouchableOpacity>
              <TouchableOpacity onPress={() => nav.goBack()}>
                <View style={{ ...styles.submit, backgroundColor: '#F7DC6F' }}>
                  <Text style={{ color: whiteColor, fontSize: 18 }}>Hủy bỏ</Text>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSubmit()}>
              <View style={{ ...styles.submit, backgroundColor: '#50D890' }}>
                <Text style={{ color: whiteColor, fontSize: 18 }}>{id ? 'Cập nhật' : 'Thêm mới'}</Text>
              </View>
            </TouchableOpacity>
            {id && (
              <TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete()}>
                  <View style={{ ...styles.submit, backgroundColor: redColor }}>
                    <Text style={{ color: whiteColor, fontSize: 18 }}>Xóa</Text>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
  //     }}
  //   </Formik>
  // );
}

const styles = StyleSheet.create({
  formSubmit: {
    flexDirection: 'row',
    bottom: 50,
    position: 'absolute',
    width: 399,
    marginHorizontal: 15,
    justifyContent: 'space-around',
    height: 70,
    alignItems: 'center',
  },
  submit: {
    backgroundColor: redColor,
    width: 130,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  submitText: {},

  labelTime: {
    fontWeight: '300',
    paddingBottom: 10,
  },
  inputTime: {
    width: 190,
    height: 40,
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 16,
    fontWeight: '200',
    paddingHorizontal: 15,
    borderColor: formColor,
    justifyContent: 'center',
  },
  inputTimeFull: {
    justifyContent: 'center',
    // width: flex,
    // flexDirection: 'row',
    // flex: 1,
    width: 399,
    height: 40,
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 16,
    fontWeight: '200',
    paddingHorizontal: 15,
    borderColor: formColor,
  },
  fieldTimeFull: { width: 399 },
  fieldTime: {
    width: 190,
  },
  boxFieldTime: { flexDirection: 'row', justifyContent: 'space-between' },
  form: { paddingHorizontal: 15, paddingTop: 20, flex: 1 },
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

  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    backgroundColor: whiteColor,
    position: 'relative',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'center',
    borderBottomWidth: 0.3,
    width: width,
    marginTop: 35,
    height: 60,
  },
  header__title: {
    fontSize: 25,
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
  },
  header__icon: {
    zIndex: 100,
    width: 50,
    paddingLeft: 10,
  },
  title: {
    fontSize: 55,
    color: whiteColor,
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: width,
    // flexDirection: 'row',
  },
})
