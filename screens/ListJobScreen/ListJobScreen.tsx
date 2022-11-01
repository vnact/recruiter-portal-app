import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { formColor, grayColor, mainColor, whiteColor } from '../../constants/Colors'
import Layout from '../../constants/Layout'
import PagerView from 'react-native-pager-view'
import ListFavouritedScreen from './ListFavouritedScreen'
import ListAppliedScreen from './ListAppiedScreen'
export default function ListJobScreen() {
  const pageRef = useRef<PagerView>(null)
  const [pageS, setPageS] = useState(0)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Danh sách việc làm</Text>
      </View>
      <View style={styles.contentTabViewForm}>
        <View style={styles.boxButton}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                pageRef.current?.setPage(0)
                setPageS(0)
              }}
            >
              <View style={pageS == 0 ? styles.optionInfoChosen : styles.optionInfo}>
                <Text style={pageS == 0 ? styles.optionTitleChosen : styles.optionTitle}>Đã ứng tuyển</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                pageRef.current?.setPage(1)
                setPageS(1)
              }}
            >
              <View style={pageS == 1 ? styles.optionInfoChosen : styles.optionInfo}>
                <Text style={pageS == 1 ? styles.optionTitleChosen : styles.optionTitle}>Đã lưu</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <PagerView
          ref={pageRef}
          style={styles.pagerView}
          initialPage={pageS}
          onPageSelected={(e) => setPageS(e.nativeEvent.position)}
        >
          <ListAppliedScreen />
          <ListFavouritedScreen />
        </PagerView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  boxButton: {
    // width: Layout.window.width,
    borderRadius: 8,
    marginHorizontal: 20,
    height: 60,
    backgroundColor: grayColor,
  },
  contentTabViewForm: {
    width: Layout.window.width,
    flex: 1,
  },
  container: {
    backgroundColor: whiteColor,
    height: Layout.window.height,
    width: Layout.window.width,
  },
  header: {
    paddingTop: 28,
    height: 90,
    // borderBottomWidth: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: '600',
  },
  optionInfo: {
    marginTop: 10,
    width: 175,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,

    marginHorizontal: 8,
    backgroundColor: grayColor,
    borderRadius: 20,
    overflow: 'hidden',
  },
  optionInfoChosen: {
    marginTop: 10,
    width: 175,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,

    marginHorizontal: 8,
    backgroundColor: mainColor,
    borderRadius: 8,
    overflow: 'hidden',
  },
  optionTitleChosen: {
    color: whiteColor,
    backgroundColor: mainColor,
    fontSize: 20,
    fontWeight: '400',
    // flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  optionTitle: {
    backgroundColor: grayColor,
    fontSize: 20,
    fontWeight: '400',
    // flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    // height: 40,
  },

  pagerView: {
    flex: 1,
    marginHorizontal: 24,
  },
})
