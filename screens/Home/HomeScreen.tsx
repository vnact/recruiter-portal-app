import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Filter } from '../../components/Filter'
import { TopCompany } from '../../components/TopCompany'
import { ListJobCard } from '../../components/ListJobCard'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { GetAllJobAction, selectJobs, selectLoading } from '../../reducers/jobSlice'
import { ICareer, IJob } from '../../constants/interface'
import { GetSelfAction } from '../../reducers/userSlice'
import { GetAllCareerAction, selectCareers } from '../../reducers/careerSlice'
export default function HomeScreen() {
  const [jobs, setJobs] = React.useState<IJob[]>([])
  const [page, setPage] = React.useState(1)
  const [careers, setCareers] = React.useState<ICareer[]>([])
  const dispatch = useAppDispatch()
  const listJob = useAppSelector(selectJobs)
  const listCareer = useAppSelector(selectCareers)
  const loading = useAppSelector(selectLoading)

  React.useEffect(() => {
    dispatch(GetAllCareerAction())
  }, [])

  React.useEffect(() => {
    if (listCareer) {
      setCareers(listCareer)
    }
  }, [listCareer])

  React.useEffect(() => {
    if (page === 1 || listJob.length) {
      dispatch(
        GetAllJobAction({
          page: page,
          size: 20,
        }),
      )
    }
  }, [page])

  React.useEffect(() => {
    setJobs((pre) => [...pre, ...listJob])
  }, [loading])

  return (
    <View style={styles.container}>
      <Filter careers={careers} />
      <TopCompany companies={jobs} page={page} setPage={setPage} />
      <ListJobCard data={jobs} title={'Suggested Job'} page={page} setPage={setPage} />
    </View>
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
