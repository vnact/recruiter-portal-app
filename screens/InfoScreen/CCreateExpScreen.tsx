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
  Modal,
  ScrollView,
  Alert,
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'

import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { blackColor, formColor, grayColor, mainColor, redColor, whiteColor } from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'
const width = Dimensions.get('window').width
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Layout from '../../constants/Layout'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { GetAllCompanyAction, selectCompanies } from '../../reducers/companySlice'
import { GetAllCareerAction, selectCareers } from '../../reducers/careerSlice'
import { EmploymentType, ICareer, IExperience } from '../../constants/interface'
import {
  CreateExperienceAction,
  DeleteExperienceAction,
  GetOneExperienceAction,
  selectExperience,
  UpdateExperienceAction,
} from '../../reducers/experienceSlice'
import { Picker } from '@react-native-picker/picker'
import { RootStackScreenProps } from '../../types'
import { enumToObject } from '../../components/mapping'

export const CCreateExpScreen: React.FC<RootStackScreenProps<'CCreateExp'>> = ({ route }) => {
  interface ICompany {
    id: number
    name: string
  }
  const { id } = route.params
  const [showPickDate, setShowPickDate] = useState(false)
  const nav = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)
  const [modalCareerVisible, setModalCareerVisible] = useState(false)
  const [idCompany, setIdCompany] = useState<number | undefined>()
  const [idCareer, setIdCareer] = useState<number | undefined>()
  const [keywordCompany, setKeyWordCompany] = useState('')
  const [keywordCareer, setKeyWordCareer] = useState('')
  const [company, setCompany] = useState<string | undefined>()
  const [career, setCareer] = useState<string | undefined>()
  const [employment_type, setEmployment_type] = useState<EmploymentType>(EmploymentType.FullTime)
  const [dateStart, setDateStart] = useState<string | undefined>('B???t ?????u')
  const [dateEnd, setDateEnd] = useState<string | undefined>('K???t th??c')
  const [description, setDescription] = useState<string | undefined>()
  const [working, setWorking] = useState(false)
  const [whatTime, setWhatTime] = useState('')
  const dataCompanies = useAppSelector(selectCompanies)
  const dataCareerCompact = useAppSelector(selectCareers)?.filter((e) => e.parent == null)
  const dataCareerChild = useAppSelector(selectCareers)?.filter((e) => e.parent != null)
  const dataCareer = useAppSelector(selectCareers)

  // const typeEmployee = Object.keys(EmploymentType).map((name) => {
  //   return {
  //     name,
  //     value: EmploymentType[name as keyof typeof EmploymentType],
  //   }
  // })
  const dispatch = useAppDispatch()
  let [careerList, setCareerList] = useState<ICareer[] | undefined>()
  let [companiesList, setCompaniesList] = useState<ICompany[] | undefined>()
  const fillterList = (key: string) => {
    setCompaniesList(dataCompanies?.filter((e) => e.name.includes(key)))
  }
  const fillterCareerList = (key: string) => {
    setCareerList(dataCareerCompact?.filter((e) => e.name.includes(key)))
  }
  useEffect(() => {
    if (id) {
      dispatch(GetOneExperienceAction({ id }))
    }
  }, [])
  const expdata = useAppSelector(selectExperience)

  useEffect(() => {
    if (expdata && id) {
      setDateEnd(expdata.endDate)
      setDateStart(expdata.startDate)
      expdata.company && setCompany(expdata.company.name)
      expdata.career && setCareer(expdata.career.name)
      expdata.career && setIdCareer(expdata.career.id)
      expdata.company && setIdCompany(expdata.company.id)
      expdata.employmentType && setEmployment_type(expdata.employmentType)
      setDescription(expdata.description)
      console.log(
        Object.keys(EmploymentType)[
          Object.values(EmploymentType).indexOf(expdata.employmentType as unknown as EmploymentType)
        ],
      )
      // setEmployment_type(expdata.employmentType)
    }
  }, [expdata])
  useEffect(() => {
    Promise.all([dispatch(GetAllCompanyAction()), dispatch(GetAllCareerAction())]).then(() => {
      setCareerList(dataCareerCompact)
      setCompaniesList(dataCompanies)
    })
  }, [])
  useEffect(() => {
    fillterList(keywordCompany)
  }, [keywordCompany])
  useEffect(() => {
    fillterCareerList(keywordCareer)
  }, [keywordCareer])
  const checkParent = (id: number) => {
    return dataCareerChild?.filter((e) => e.parent?.id == id)[0] ? true : false
  }
  const findParent = (id: number) => {
    return dataCareerChild?.filter((e) => e.parent?.id == id)
  }
  const onDelete = () => {
    Alert.alert('C???nh b??o', 'B???n c?? mu???n x??a kh??ng ?', [
      {
        text: 'Cancel',
        onPress: () => nav.goBack(),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          if (id) {
            await dispatch(DeleteExperienceAction({ id }))
            alert('X??a th??nh c??ng')
            nav.goBack()
          }
        },
      },
    ])
  }
  const onSubmit = async () => {
    if (idCareer && idCompany && dateStart && dateEnd && employment_type) {
      const payload = {
        id: id || undefined,
        career_id: idCareer,
        employment_type,
        start_date: dateStart,
        end_date: dateEnd,
        company_id: idCompany,
        description,
        title: '??dsa',
      }
      if (id) {
        console.log('ad')
        await dispatch(UpdateExperienceAction(payload))
        alert('C???p nh???t th??nh c??ng')
        nav.goBack()
      } else {
        await dispatch(CreateExperienceAction(payload))
        alert('T???o th??nh c??ng')
        nav.goBack()
      }
    }
  }
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
            <Text style={styles.header__title}>Kinh nghi???m</Text>
          </View>
        </View>

        <View style={styles.form}>
          <ScrollView>
            <View style={styles.field}>
              <Text style={styles.label}>
                C??ng ty <Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                editable={false}
                value={company}
                onPressIn={() => {
                  setModalVisible(true)
                  setKeyWordCompany('')
                }}
                placeholderTextColor={formColor}
                placeholder="T??n c??ng ty b???n ???? l??m vi???c"
                style={styles.input}
              ></TextInput>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>
                V??? tr?? <Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                editable={false}
                onPressIn={() => {
                  setModalCareerVisible(true)
                  setKeyWordCareer('')
                }}
                placeholderTextColor={formColor}
                placeholder="V??? tr?? c???a b???n trong c??ng ty"
                value={career}
                style={styles.input}
              ></TextInput>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>
                Lo???i h??nh <Text style={styles.star}>*</Text>
              </Text>
              <Picker selectedValue={employment_type} onValueChange={(itemValue) => setEmployment_type(itemValue)}>
                {enumToObject(EmploymentType).map((e) => (
                  <Picker.Item label={e.name} value={e.value} />
                ))}
              </Picker>
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>
                Th???i gian <Text style={styles.star}>*</Text>
              </Text>
              <View style={styles.boxFieldTime}>
                <View style={!working ? styles.fieldTime : styles.fieldTimeFull}>
                  <Text style={styles.labelTime}>B???t ?????u</Text>
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

                <View style={styles.fieldTime}>
                  <Text style={styles.labelTime}>K???t th??c</Text>
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
            {/* <BouncyCheckbox
            size={22}
            fillColor={redColor}
            unfillColor="#FFFFFF"
            text="T??i ??ang l??m vi???c ??? ????y"
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
          /> */}
            <View style={styles.field}>
              <Text style={styles.label}>
                M?? t??? chi ti???t <Text style={styles.star}>*</Text>
              </Text>
              <TextInput
                multiline
                value={description}
                onChangeText={setDescription}
                placeholderTextColor={formColor}
                placeholder="M?? t??? chi ti???t v??? c??ng vi???c c???a b???n ???? l??m"
                style={{ ...styles.input, height: 150 }}
              ></TextInput>
            </View>
            <View style={styles.formSubmit}>
              <TouchableOpacity>
                <TouchableOpacity onPress={() => nav.goBack()}>
                  <View style={{ ...styles.submit, backgroundColor: '#F7DC6F' }}>
                    <Text style={{ color: whiteColor, fontSize: 18 }}>H???y b???</Text>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onSubmit()}>
                <View style={{ ...styles.submit, backgroundColor: '#50D890' }}>
                  <Text style={{ color: whiteColor, fontSize: 18 }}>{id ? 'C???p nh???t' : 'Th??m m???i'}</Text>
                </View>
              </TouchableOpacity>
              {id && (
                <TouchableOpacity>
                  <TouchableOpacity onPress={() => onDelete()}>
                    <View style={{ ...styles.submit, backgroundColor: redColor }}>
                      <Text style={{ color: whiteColor, fontSize: 18 }}>X??a</Text>
                    </View>
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
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
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="arrow-back-ios" size={30} color={mainColor} />
              </TouchableOpacity>
              <TextInput
                autoFocus={true}
                placeholder="Nh???p v??o t??? kh??a"
                placeholderTextColor={formColor}
                value={keywordCompany}
                onChangeText={setKeyWordCompany}
              ></TextInput>
            </View>
            <View style={styles.list}>
              {companiesList &&
                companiesList.map((e, key) => (
                  <TouchableOpacity
                    onPress={() => {
                      setCompany(e.name)
                      setIdCompany(e.id)
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
              <TouchableOpacity onPress={() => setModalCareerVisible(false)}>
                <MaterialIcons name="arrow-back-ios" size={30} color={blackColor} />
              </TouchableOpacity>
              <TextInput
                // autoFocus={true}
                placeholder="Nh???p v??o t??? kh??a"
                placeholderTextColor={formColor}
                value={keywordCareer}
                onChangeText={setKeyWordCareer}
                onFocus={() => console.log('focus')}
                // clearTextOnFocus={true}
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
                            setCareer(e.name)
                            setIdCareer(e.id)
                            setModalCareerVisible(false)
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
                            setCareer(e.name)
                            setIdCareer(e.id)
                            setModalCareerVisible(false)
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
                              setCareer(e.name)
                              setIdCareer(e.id)
                              setModalCareerVisible(false)
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
    // bottom: 50,
    // position: 'absolute',
    width: 399,
    // marginHorizontal: 15,
    justifyContent: 'space-around',
    height: 70,
    alignItems: 'center',
  },
  submit: {
    backgroundColor: redColor,
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
})
