import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { FC } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Button } from '@rneui/themed'
import { ICompany, IJob } from '../constants/interface'

interface IComPanyProps {
  item: IJob
}

const Company: FC<IComPanyProps> = ({ item }) => {
  return (
    <View style={styles.company}>
      <View style={styles.companyHeader}>
        <View style={styles.logo}>
          <Image
            source={{
              uri: 'https://cdn.topcv.vn/80/company_logos/295f6a316d2959a4c890dd2a55f606e8-604996d0c88d6.jpg',
            }}
            style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 10 }}
          />
        </View>
        <View style={styles.infoCompany}>
          <Text style={styles.nameCompany}>{item.company.name}</Text>
          <Text style={styles.address}>{item.location}</Text>
        </View>
      </View>
      <View style={styles.infoJob}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 6,
          }}
        >
          <MaterialIcons name="fiber-manual-record" />
          <Text style={styles.text}>
            Slary: ${item.minSalary}k-{item.maxSalary}k/Mo
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <MaterialIcons name="fiber-manual-record" />
          <Text style={styles.text}>{item.workplaces[0]}</Text>
        </View>
      </View>
      <View style={styles.button}>
        <Button
          buttonStyle={{
            backgroundColor: '#000000',
            borderRadius: 10,
          }}
        >
          Show All
        </Button>
      </View>
    </View>
  )
}

interface IPropTopCompany {
  companies: IJob[]
  page: number
  setPage: (page: number) => void
}
export const TopCompany: FC<IPropTopCompany> = ({ companies, page, setPage }) => {
  const nextPage = () => {
    setPage(page + 1)
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Company</Text>
        <MaterialIcons name="more-horiz" size={26} />
      </View>
      <View style={styles.body}>
        <FlatList
          data={companies}
          keyExtractor={(item, index) => item.title + index}
          renderItem={({ item, index }) => <Company item={item} key={index} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onEndReached={nextPage}
          onEndReachedThreshold={0.5}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  company: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.25)',
    borderWidth: 0.25,
    borderColor: '#E5E5E5',
    minWidth: 250,
    marginRight: 10,
  },
  companyHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  nameCompany: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  address: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6E6D7A',
  },
  infoCompany: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    justifyContent: 'space-around',
  },
  infoJob: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6F6F6F',
    marginLeft: 5,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  body: {
    marginTop: 15,
  },
})
