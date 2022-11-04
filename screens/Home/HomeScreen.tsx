import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Filter } from '../../components/Filter'
import { TopCompany } from '../../components/TopCompany'
import { ListJobCard } from '../../components/ListJobCard'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { GetSuggestionJobAction, selectJobs, selectLoading } from '../../reducers/jobSlice'
import { GetAllCompanyAction, selectCompanies } from '../../reducers/companySlice'
export default function HomeScreen() {
  const [page, setPage] = useState(1)
  const dispatch = useAppDispatch()
  const jobs = useAppSelector(selectJobs)
  const companies = useAppSelector(selectCompanies)
  const loading = useAppSelector(selectLoading)

  useEffect(() => {
    dispatch(GetAllCompanyAction())
  }, [])

  useEffect(() => {
    dispatch(
      GetSuggestionJobAction({
        page: page,
        size: 20,
      }),
    )
  }, [page])

  const reloadListJob = () => {
    dispatch(
      GetSuggestionJobAction({
        page: 1,
        size: 20,
      }),
    )
  }

  return (
    <View style={styles.container}>
      <Filter />
      <TopCompany companies={companies} page={page} setPage={setPage} />
      <ListJobCard data={jobs} title={'Công việc đề xuất'} page={page} setPage={setPage} reload={reloadListJob} />
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
