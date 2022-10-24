import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { blackColor, formColor, grayColor, greenColor, redColor, whiteColor } from '../../constants/Colors'
import { FastField, Field, Form, Formik } from 'formik'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import { useAppDispatch } from '../../app/hook'
import { CreateEducationAction } from '../../reducers/educationSlice'
// interface MyFormValues {
//   school: string | null
//   major: string | null
//   timeStart: string | null
//   timeEnd: string | null
//   description: string | null
// }
const width = Dimensions.get('window').width
export default function CCreateEducationScreen() {
  const dispatch = useAppDispatch()
  const nav = useNavigation()
  const [showPickDate, setShowPickDate] = useState(false)
  const [dateStart, setDateStart] = useState('2018-01-01')
  const [dateEnd, setDateEnd] = useState('2018-01-01')
  const [studying, setStudying] = useState(true)
  const [school, setSchool] = useState('Học viện Kỹ thuật Mật mã')
  const [field, setFiled] = useState('Công nghệ thông tin')
  const [desc, setDesc] = useState(
    'Trường Học viện Kỹ Thuật Mật mã thuộc ban cơ yếu chính phủ, chuyên đào tạo các kỹ sự ATTT,CNTT và DT',
  )
  const [working, setWorking] = useState(false)
  const [whatTime, setWhatTime] = useState('')
  // const initialValues: MyFormValues = {
  //   school: null,
  //   major: null,
  //   timeEnd: null,
  //   timeStart: null,
  //   description: null,
  // }

  const onSubmit = () => {
    dispatch(
      CreateEducationAction({
        school,
        filedOfStudy: field,
        startTime: dateStart,
        endTime: dateEnd,
        isCompleted: studying,
        description: desc,
      }),
    )
    // if (dateEnd == '')
    //   dispatch(
    //     CreateEducationAction({
    //       school,
    //       filedOfStudy: field,
    //       start_time: dateStart,
    //       isCompleted: studying,
    //       description: desc,
    //     }),
    //   )
    // else
    // console.log(moment(dateStart))
    // console.log({ dateStart, dateEnd, school, field, studying, desc })
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
            <TextInput
              value={field}
              onChangeText={setFiled}
              placeholderTextColor={formColor}
              placeholder="VD: Công nghệ thông tin"
              style={styles.input}
            />
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
                  setDateStart(moment(date).format('DD/MM/YYYY'))
                } else setDateEnd(moment(date).format('DD/MM/YYYY'))
                setShowPickDate(false)
              }}
              onCancel={() => setShowPickDate(false)}
            />
          </View>
          <BouncyCheckbox
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
                <View style={styles.submit}>
                  <Text style={{ color: whiteColor, fontSize: 18 }}>Hủy bỏ</Text>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSubmit()}>
              <View style={{ ...styles.submit, backgroundColor: '#50D890' }}>
                <Text style={{ color: whiteColor, fontSize: 18 }}>Thêm mới</Text>
              </View>
            </TouchableOpacity>
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
    width: 150,
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
