import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import React, { useState, useRef } from 'react'

import { Ionicons } from '@expo/vector-icons'
import { blackColor, formColor, redColor, whiteColor } from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'
const width = Dimensions.get('window').width
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

export default function CCreateExpScreen() {
  const [showPickDate, setShowPickDate] = useState(false)
  const nav = useNavigation()
  const scrollValue = useRef(new Animated.Value(0)).current
  const [gender, setGender] = useState(null)
  const [dateStart, setDateStart] = useState('Bắt đầu')
  const [dateEnd, setDateEnd] = useState('Kết thúc')
  const [working, setWorking] = useState(false)
  const [whatTime, setWhatTime] = useState('')
  return (
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
            <Text style={styles.header__title}>Kinh nghiệm</Text>
          </View>
        </View>
        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>
              Công ty <Text style={styles.star}>*</Text>
            </Text>
            <TextInput
              placeholderTextColor={formColor}
              placeholder="Tên công ty bạn đã làm việc"
              style={styles.input}
            ></TextInput>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>
              Vị trí <Text style={styles.star}>*</Text>
            </Text>
            <TextInput
              placeholderTextColor={formColor}
              placeholder="Vị trí của bạn trong công ty"
              style={styles.input}
            ></TextInput>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>
              Thời gian <Text style={styles.star}>*</Text>
            </Text>
            <View style={styles.boxFieldTime}>
              <View style={!working ? styles.fieldTime : styles.fieldTimeFull}>
                <Text style={styles.labelTime}>Bắt đầu</Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowPickDate(true)
                    setWhatTime('start')
                  }}
                >
                  <View style={!working ? styles.inputTime : styles.inputTimeFull}>
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
              {!working ? (
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
            text="Tôi đang làm việc ở đây"
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
              setWorking(isChecked)
            }}
          />
          <View style={styles.field}>
            <Text style={styles.label}>Mô tả chi tiết</Text>
            <TextInput
              multiline
              placeholderTextColor={formColor}
              placeholder="Mô tả chi tiết về công việc của bạn đã làm"
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
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
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
  fieldFlex: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  form: { marginTop: 20, paddingHorizontal: 15, flex: 1, paddingBottom: 40 },
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
})
