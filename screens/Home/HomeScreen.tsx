import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Filter } from '../../components/Filter'
import { TopCompany } from '../../components/TopCompany'
import { ListJobCard } from '../../components/ListJobCard'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { GetAllJobAction, selectJobs, selectLoading } from '../../reducers/jobSlice'
import { IJob } from '../../constants/interface'
import { GetSelfAction } from '../../reducers/userSlice'
export default function HomeScreen() {
  const [jobs, setJobs] = React.useState<IJob[]>([])
  const [page, setPage] = React.useState(1)
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectJobs)
  const loading = useAppSelector(selectLoading)
  React.useEffect(() => {
    if (page === 1 || data.length) {
      dispatch(
        GetAllJobAction({
          page: page,
          size: 20,
        }),
      )
      dispatch(GetSelfAction())
    }
  }, [page])

  React.useEffect(() => {
    setJobs((pre) => [...pre, ...data])
  }, [loading])

  return (
    <View style={styles.container}>
      <Filter />
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
