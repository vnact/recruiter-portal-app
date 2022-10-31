import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { formColor, mainColor, redColor, whiteColor } from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import Layout from '../../constants/Layout'
import { ISkill } from '../../constants/interface'
import { GetAllSkillAction, selectSkills } from '../../reducers/skillSlice'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { CreateUserSkillAction, DeleteUserSkillAction } from '../../reducers/userSkillSlice'
import { RootStackScreenProps } from '../../types'
const width = Dimensions.get('window').width
export const CCreateSkillScreen: React.FC<RootStackScreenProps<'CCreateSkill'>> = ({ route }) => {
  const { id } = route.params
  const nav = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)
  const [skill, setSkill] = useState<string | undefined>()
  const [idSkill, setIdSkill] = useState<number | undefined>()
  const [keyword, setKeyWord] = useState('')
  const [certificate, setCertificate] = useState<string | undefined>()
  const dataSkills = useAppSelector(selectSkills)
  const dispatch = useAppDispatch()
  let [skillsList, setSkillsList] = useState<ISkill[] | undefined>(dataSkills)
  const fillterList = (key: string) => {
    console.log(key)
    setSkillsList(dataSkills?.filter((e) => e.name.includes(key)))
    // console.log(skillsList)
  }
  useEffect(() => {
    Promise.all([dispatch(GetAllSkillAction())]).then(() => {
      setSkillsList(dataSkills)
    })
  }, [])
  useEffect(() => {
    if (id && dataSkills) {
      setIdSkill(id)
      setSkill(dataSkills[id - 1].name)
    }
  }, [dataSkills])
  useEffect(() => {
    fillterList(keyword)
  }, [keyword])
  const submit = async () => {
    if (skill && idSkill) {
      const payload = {
        skills_id: [idSkill],
        certificate,
      }
      await dispatch(CreateUserSkillAction(payload))
      Alert.alert('Bạn thêm kĩ năng thành công!')
      nav.goBack()
    }
  }
  const deleteSkill = async () => {
    if (skill && idSkill) {
      const payload = {
        skills_id: [idSkill],
      }
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
              await dispatch(DeleteUserSkillAction(payload))
              alert('Xóa thành công')
              nav.goBack()
            }
          },
        },
      ])
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
            <Text style={styles.header__title}>Kỹ năng</Text>
          </View>
        </View>
        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>
              Tên kĩ năng <Text style={styles.star}>*</Text>
            </Text>
            <TextInput
              editable={false}
              onPressIn={() => setModalVisible(true)}
              placeholderTextColor={formColor}
              placeholder="VD: Kỹ năng tiếng anh"
              style={styles.input}
              value={skill}
            ></TextInput>
          </View>
          {/* <View style={styles.field}>
            <Text style={styles.label}>
              Đánh giá <Text style={styles.star}>*</Text>
            </Text>
            <TextInput
              placeholderTextColor={formColor}
              placeholder="VD: Toeic 450/990"
              style={styles.input}
            ></TextInput>
          </View> */}
          <View style={styles.field}>
            <Text style={styles.label}>Mô tả chi tiết</Text>
            <TextInput
              value={certificate}
              onChangeText={setCertificate}
              multiline
              placeholderTextColor={formColor}
              placeholder="Mô tả chi tiết kỹ nằng"
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
            {id ? (
              <TouchableOpacity onPress={() => deleteSkill()}>
                <View style={{ ...styles.submit, backgroundColor: redColor }}>
                  <Text style={{ color: whiteColor, fontSize: 18 }}>Xóa</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => submit()}>
                <View style={{ ...styles.submit, backgroundColor: '#50D890' }}>
                  <Text style={{ color: whiteColor, fontSize: 18 }}>Thêm mới</Text>
                </View>
              </TouchableOpacity>
            )}
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
              <TouchableOpacity onPress={() => setModalVisible(false)}>
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
              {skillsList &&
                skillsList.map((e, key) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSkill(e.name)
                      setIdSkill(key + 1)
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
    backgroundColor: '#F7DC6F',
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
})
