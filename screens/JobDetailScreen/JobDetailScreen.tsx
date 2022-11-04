import { StyleSheet, Text, View, TouchableOpacity, Image, useWindowDimensions, Dimensions } from 'react-native'
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { formColor, mainColor, redColor, whiteColor } from '../../constants/Colors'
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { SceneMap, TabView } from 'react-native-tab-view'
import PagerView from 'react-native-pager-view'
import { JDInfoScreen } from './JDInfoScreen'
import { JDCompanyScreen } from './JDCompanyScreen'
import { RootStackScreenProps } from '../../types'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import {
  ApplyJobAction,
  ChangeFavoriteAction,
  GetJobByIdAction,
  selectJob,
  selectLoading,
} from '../../reducers/jobSlice'
import { selectUser } from '../../reducers/userSlice'
import SplashScreen from '../SplashScreen'

const FirstRoute = () => <View style={{ flex: 1, backgroundColor: '#ff4081' }} />

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
})

export const JobDetailScreen: React.FC<RootStackScreenProps<'JobDetailScreen'>> = ({ route }) => {
  const { id } = route.params
  const user = useAppSelector(selectUser)
  const loading = useAppSelector(selectLoading)

  const job = useAppSelector(selectJob)
  const dispatch = useAppDispatch()

  const pageRef = useRef<PagerView>(null)
  const [pageS, setPageS] = useState(0)
  const nav = useNavigation()
  const isLike = useMemo(() => job && !!user?.favoriteJobs.map((item) => item.job.id).includes(job.id), [user, job])
  const isApplied = useMemo(() => job && !!user?.appliedJobs.map((item) => item.job.id).includes(job.id), [user, job])

  useEffect(() => {
    dispatch(GetJobByIdAction(id))
  }, [id])

  if (loading === 'loading') {
    return <SplashScreen />
  }

  const changeFavorite = (jobId: number) => {
    if (user) {
      dispatch(ChangeFavoriteAction(jobId))
    }
  }

  const applyJob = (id: number) => {
    if (user) {
      dispatch(ApplyJobAction(id))
    }
  }

  if (job) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <TouchableOpacity onPress={() => nav.goBack()}>
              <MaterialIcons name="keyboard-arrow-left" size={40} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTitle}>
            <Text style={styles.title}>Chi tiết công việc</Text>
          </View>
          <View style={{ ...styles.headerIcon, alignItems: 'flex-end', paddingRight: 10 }}>
            <TouchableOpacity onPress={() => changeFavorite(job?.id)}>
              {!isLike ? (
                <Feather name="heart" size={30} color={redColor} />
              ) : (
                <FontAwesome name="heart" size={30} color={redColor} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Image
              source={{
                uri: job.company.avatar,
              }}
              style={styles.avatar}
            />
            <Text style={styles.positionTitle}>{job?.title}</Text>
            <Text style={styles.companyTitle}>{job?.company.name}</Text>
          </View>
          <View style={styles.contentTabViewForm}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  pageRef.current?.setPage(0)
                  setPageS(0)
                }}
              >
                <View style={pageS == 0 ? styles.optionInfoChosen : styles.optionInfo}>
                  <Text style={pageS == 0 ? styles.optionTitleChosen : styles.optionTitle}>Thông tin</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  pageRef.current?.setPage(1)
                  setPageS(1)
                }}
              >
                <View style={pageS == 1 ? styles.optionInfoChosen : styles.optionInfo}>
                  <Text style={pageS == 1 ? styles.optionTitleChosen : styles.optionTitle}>Công ty</Text>
                </View>
              </TouchableOpacity>
            </View>
            <PagerView
              ref={pageRef}
              style={styles.pagerView}
              initialPage={pageS}
              onPageSelected={(e) => setPageS(e.nativeEvent.position)}
            >
              <JDInfoScreen job={job} />
              <JDCompanyScreen company={job.company} />
            </PagerView>
          </View>
          <View style={styles.bottom}>
            <View>
              <Text style={{ fontSize: 18, color: formColor }}>Lương cơ bản</Text>
              <Text style={{ fontSize: 25, color: mainColor }}>
                ${job?.minSalary} - ${job?.maxSalary}
              </Text>
            </View>
            <TouchableOpacity onPress={() => applyJob(job.id)}>
              <View style={styles.submit}>
                {isApplied ? (
                  <Text style={{ fontSize: 18, color: whiteColor }}>Hủy</Text>
                ) : (
                  <Text style={{ fontSize: 18, color: whiteColor }}>Ứng tuyển ngay</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  return <View></View>
}

const styles = StyleSheet.create({
  bottom: {
    height: 100,
    borderTopWidth: 0.2,
    borderTopColor: formColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  submit: {
    height: 40,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: mainColor,
  },
  optionInfo: {
    marginTop: 10,
    width: 175,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,

    marginHorizontal: 15,
    backgroundColor: formColor,
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

    marginHorizontal: 15,
    backgroundColor: '#FA5804',
    borderRadius: 20,
    overflow: 'hidden',
  },
  optionTitleChosen: {
    color: whiteColor,
    backgroundColor: '#FA5804',
    fontSize: 20,
    fontWeight: '400',
    // flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  optionTitle: {
    backgroundColor: formColor,
    fontSize: 20,
    fontWeight: '400',
    // flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    // height: 40,
  },
  container: {
    backgroundColor: whiteColor,
    flex: 1,
  },
  pagerView: {
    flex: 1,
    marginHorizontal: 24,
  },
  contentTabViewForm: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 0.2,
    borderBottomColor: formColor,
    flexDirection: 'row',
    paddingTop: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerIcon: {
    width: 100,
  },
  headerTitle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  contentHeader: {
    alignItems: 'center',
  },
  content: {
    marginTop: 15,
    flex: 1,
  },

  avatar: { height: 120, width: 120, borderRadius: 25 },
  positionTitle: {
    fontSize: 25,
    fontWeight: '500',
    marginVertical: 10,
  },
  companyTitle: {
    fontSize: 25,
    fontWeight: '300',
  },
})
