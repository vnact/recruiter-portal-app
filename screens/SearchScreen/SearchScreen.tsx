import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { ListJobCard } from '../../components/ListJobCard'

export const SearchScreen = () => {
  const [modalVisible, setModalVisible] = React.useState(true)
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.container}>
        <TextInput
          style={{
            height: 40,
            width: 300,
            borderWidth: 1,
            paddingHorizontal: 8,
            alignItems: 'center',
            flexDirection: 'row',
            borderRadius: 10,
            backgroundColor: '#fff',
          }}
          placeholder="Tìm kiếm đi nào ?"
        />
        <Button onPress={() => setModalVisible(false)} title={'disible'} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FDFDFD',
  },
})
