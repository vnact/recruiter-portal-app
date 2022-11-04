import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Filter } from '../../components/Filter'
import { TopCompany } from '../../components/TopCompany'
import { ListJobCard } from '../../components/ListJobCard'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { GetAllJobAction, selectJobs, selectLoading } from '../../reducers/jobSlice'
import { ICareer, ICompany, IJob } from '../../constants/interface'
import { GetSelfAction } from '../../reducers/userSlice'
import { GetAllCareerAction, selectCareers } from '../../reducers/careerSlice'
import { GetAllCompanyAction, selectCompanies } from '../../reducers/companySlice'
export default function HomeScreen() {
  const [jobs, setJobs] = React.useState<IJob[]>([])
  const [page, setPage] = React.useState(1)
  const dispatch = useAppDispatch()
  const listJob = useAppSelector(selectJobs)
  const careers = useAppSelector(selectCareers)
  const companies = useAppSelector(selectCompanies)
  const loading = useAppSelector(selectLoading)

  React.useEffect(() => {
    dispatch(GetAllCareerAction())
  }, [])

  React.useEffect(() => {
    dispatch(GetAllCompanyAction())
  }, [])

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
      <TopCompany companies={companies} page={page} setPage={setPage} />
      <ListJobCard data={jobs} title={'Công việc đề xuất'} page={page} setPage={setPage} />
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
