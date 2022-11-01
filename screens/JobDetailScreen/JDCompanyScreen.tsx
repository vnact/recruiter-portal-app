import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { formColor } from '../../constants/Colors'
import { ListJobCard } from '../../components/ListJobCard'
import { ICompany } from '../../constants/interface'

const desc: string[] = [
  'SERVICES',
  'Web Apps Development',
  'Our reponsive web site designs will make you look good in every screen. Ecommerce, CMS, corporate, personal or custom web application.',
  'Mobile Apps Development',
  'IOS and Android app development. Why pick a platform? Get your native or HTML5 apps to support all the major mobile platforms.',
  'Blockchain Solutions',
  'Making full-fledged cryptocurrency exchange, ICO solution, integrate cryptocurrency deposit and withdraw and payment. Read more',
  'AI Solutions',
  'Using the power of machine learning tools and technologies, our AI experts and development team offer comprehensive and cutting-edge solutions to your current or potential business needs.',
  'Embedded Systems',
  'We are experienced in automotive domain with car navigation, ECU unit testing and development, drivers development, firmware middleware development.',
  'BPO (Business Process Outsourcing)',
  'Experience in simple jobs like data entry, labeling image with high productivity and low costs.',
]

interface IProps {
  company: ICompany
}

export const JDCompanyScreen: FC<IProps> = ({ company }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.boxInfo}>
          <Text style={styles.boxTitle}>Công ty cổ phần CLA Tech</Text>
          <View style={styles.listShow}>
            <View style={styles.item}>
              <View style={styles.boxIcon}>
                <Image source={require('../../assets/images/icon/location-icon.png')} style={styles.icon} />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTitle}>Địa chỉ công ty:</Text>
                <Text style={styles.itemContent}>{company.address}</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={styles.boxIcon}>
                <Image source={require('../../assets/images/icon/www-icon.png')} style={styles.icon} />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTitle}>Website công ty:</Text>
                <Text style={styles.itemContent}>https://github.com/vnact</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.boxDesc}>
          <Text style={styles.boxTitle}>Thông tin chung</Text>
          {desc.map((e, i) => (
            <Text style={{ fontSize: 15, fontWeight: '300', textAlign: 'justify', paddingBottom: 8 }} key={i}>
              {/* {'\u25CF' + '  '} */}
              {e}
            </Text>
          ))}
        </View>
        <View></View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  boxDesc: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    // maxHeight: 520,
    backgroundColor: '#FAFAFA',
    borderRadius: 15,
    marginTop: 20,
  },
  container: {
    marginTop: 20,
  },
  boxInfo: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    // maxHeight: 520,
    backgroundColor: '#FAFAFA',
    borderRadius: 15,
    // overflow: 'hidden',
  },
  boxTitle: {
    fontSize: 20,
    height: 40,
  },
  listHide: {
    height: 180,
    overflow: 'hidden',
  },
  listShow: {},
  item: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  boxIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#C7F0DB',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  itemRight: {
    flex: 1,
    marginHorizontal: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: formColor,
    paddingBottom: 10,
  },
  itemTitle: {
    height: 25,
    color: '#5C5757',
    fontSize: 16,
  },

  itemContent: {
    fontSize: 16,
  },
})
