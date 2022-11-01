import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'

import { Picker } from '@react-native-picker/picker'
import { GoogleMap, GoogleMapState } from './GoogleMap'
import { primaryColor } from '../constants/Colors'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { Button } from '@rneui/themed'
import { EmploymentType, ExpLevel, ICareer } from '../constants/interface'
import { useAppDispatch } from '../app/hook'
import { SearchJobAction } from '../reducers/jobSlice'

export interface IJob {
  id: string
  name: string
}

interface ItemProps {
  item: IJob
}

interface IModalPopupFilterProps {
  modalVisible: boolean
  setModalVisible: Function
}

const listFilter: IJob[] = [
  {
    id: '1',
    name: 'Programming',
  },
  {
    id: '2',
    name: 'Design',
  },
  {
    id: '3',
    name: 'Marketing',
  },
  {
    id: '4',
    name: 'Sales',
  },
]

const ModalPopupFilter: FC<IModalPopupFilterProps> = ({ modalVisible, setModalVisible }) => {
  const dispatch = useAppDispatch()
  const [salaryMax, setSalaryMax] = useState()
  const [salaryMin, setSalaryMin] = useState()

  const [rangeMetter, setRangeMetter] = useState<number>(0)
  const [modalLocation, setModalLocation] = useState(false)
  const [selectedJobType, setSelectedJobType] = useState<EmploymentType>(EmploymentType.PartTime)
  const [selectedLevel, setSelectedLevel] = useState<ExpLevel>(ExpLevel.NoExp)
  const [location, setLocation] = useState<GoogleMapState>({
    latitude: 20.980194953622984,
    longitude: 105.79615346430842,
  })
  const showResult = () => {
    dispatch(
      SearchJobAction({
        levels: [selectedLevel],
        jobTypes: [selectedJobType],
        lat: location.latitude,
        lng: location.longitude,
        rangeMeter: rangeMetter,
        page: 1,
      }),
    )
  }

  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <View style={styles.centeredView}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>
            <View style={styles.filter}>
              <View style={styles.header}>
                <Text style={styles.title}>Filter</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ ...styles.title, color: primaryColor, fontSize: 18 }}>Reset</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.fieldFilter}>
                <View>
                  <Text style={{ ...styles.title, fontSize: 18 }}>Job Types</Text>
                  <View style={styles.inputFilter}>
                    <Picker
                      selectedValue={selectedJobType}
                      onValueChange={(itemValue, itemIndex) => setSelectedJobType(itemValue)}
                      style={{ flex: 1 }}
                    >
                      {Object.keys(EmploymentType).map((item, index) => (
                        <Picker.Item label={item} value={Object.values(EmploymentType)[index]} key={index} />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
              <View style={styles.fieldFilter}>
                <View>
                  <Text style={{ ...styles.title, fontSize: 18 }}>Level</Text>
                  <View style={styles.inputFilter}>
                    <Picker
                      selectedValue={selectedLevel}
                      onValueChange={(itemValue, itemIndex) => setSelectedLevel(itemValue)}
                      style={{ flex: 1 }}
                    >
                      {Object.keys(ExpLevel).map((item, index) => (
                        <Picker.Item label={item} value={Object.values(EmploymentType)[index]} key={index} />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
              <View style={styles.fieldFilter}>
                <View>
                  <Text style={{ ...styles.title, fontSize: 18 }}>Location</Text>
                  <TouchableOpacity onPress={() => setModalLocation(true)}>
                    <View style={{ ...styles.inputFilter, padding: 15 }}>
                      <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                        <Feather name="map-pin" style={{ color: '#000000' }} size={16} />
                        <Text style={{ ...styles.text, marginLeft: 10 }}>{'Select location'}</Text>
                      </View>
                      <View>
                        <MaterialIcons
                          name="location-searching"
                          style={{ color: '#000000', fontWeight: '500' }}
                          size={16}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.fieldFilter}>
                <View>
                  <Text style={{ ...styles.title, fontSize: 18 }}>Range Meter (km)</Text>
                  <View style={styles.inputFilter}>
                    <TextInput
                      onChangeText={() => setRangeMetter(1)}
                      keyboardType="numeric"
                      style={{ padding: 10, minWidth: '100%' }}
                    ></TextInput>
                  </View>
                </View>
              </View>
              {/* <View style={styles.fieldFilter}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ ...styles.title, fontSize: 18 }}>Salary</Text>
                  <Text style={{ ...styles.text, color: primaryColor }}>Month</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ ...styles.inputFilter, flex: 1, marginRight: 10 }}>
                    <Feather name="dollar-sign" style={{ color: '#000000', fontWeight: '500' }} size={16} />
                    <TextInput style={{ width: '100%' }} keyboardType="numeric" placeholder="Min" />
                  </View>
                  <View style={{ ...styles.inputFilter, flex: 1, marginLeft: 10 }}>
                    <Feather name="dollar-sign" style={{ color: '#000000', fontWeight: '500' }} size={16} />
                    <TextInput style={{ width: '100%' }} keyboardType="numeric" placeholder="Max" />
                  </View>
                </View>
              </View> */}

              <View
                style={{
                  ...styles.fieldFilter,
                  width: '100%',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  display: 'flex',
                }}
              >
                <Button
                  title={'Show Result'}
                  buttonStyle={{
                    width: 200,
                    height: 50,
                    borderRadius: 30,
                    backgroundColor: '#000000',
                  }}
                  onPress={() => showResult()}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <GoogleMap
          modalLocation={modalLocation}
          setModalLocation={setModalLocation}
          location={location}
          setLocation={setLocation}
        />
      </View>
    </Modal>
  )
}

const Item: FC<ItemProps> = ({ item }) => {
  const [listSelected, setListSelected] = React.useState<string[]>([])
  const handleSelected = (id: string) => {
    if (listSelected.includes(id)) {
      setListSelected(listSelected.filter((item) => item !== id))
    } else {
      setListSelected([...listSelected, id])
    }
  }

  return (
    <TouchableOpacity onPress={() => handleSelected(item.id)}>
      {listSelected.includes(item.id) ? (
        <View style={{ ...styles.item, backgroundColor: primaryColor }}>
          <Text style={{ ...styles.text, color: '#FFFFFF' }}>{item.name}</Text>
        </View>
      ) : (
        <View style={styles.item}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

interface IFilterProps {
  careers: ICareer[]
}

export const Filter: FC<IFilterProps> = ({ careers }) => {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <View style={styles.icon}>
          <Feather name="filter" size={25} />
        </View>
      </TouchableOpacity>
      {modalVisible && <ModalPopupFilter modalVisible={modalVisible} setModalVisible={setModalVisible} />}
      <View style={styles.listItem}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={listFilter}
          renderItem={({ item, index }) => <Item item={item} key={index} />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 45,
    height: 45,
    backgroundColor: '#FDFDFD',
    padding: 5,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FAFAFA',
  },
  listItem: {
    flex: 1,
  },
  item: {
    minWidth: 45,
    minHeight: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDFDFD',
    borderRadius: 15,
    paddingLeft: 12,
    paddingRight: 12,
    pađingTop: 5,
    paddingBottom: 5,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#F8F8F8',
  },
  text: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
  },

  centeredView: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'relative',
  },
  filter: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    paddingBottom: 80,
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },

  fieldFilter: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },

  inputFilter: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: '#E5E5E5',
    borderWidth: 0.5,
    marginTop: 15,
    justifyContent: 'space-between',
  },
})
