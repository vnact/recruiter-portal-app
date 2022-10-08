import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { formColor, mainColor } from '../../constants/Colors'

export default function JDInfoScreen() {
  const [isShow, setShow] = useState(false)
  const desc: string[] = [
    'Tham gia xây dựng và phát triển sản phẩm TMĐT (dựa trên Big Data), giúp 50 triệu người mua shopping online thông minh hơn và giúp 1 triệu người bán kinh doanh thông minh hơn. Hiện tại đang phục vụ 3 triệu người mua và 5000 doanh nghiệp hàng tháng.',
    'Khắc phục sự cố, duy trì hiệu suất cao và khả năng đáp ứng tải cao của hệ thống',
    'Hỗ trợ xử lý phản hồi về mặt kỹ thuật, tham gia xây dựng sản phẩm sát với yêu cầu khách hàng đầu cuối.',
  ]
  const request: string[] = [
    'Có kinh nghiệm 1 năm trở lên trong vai trò Fullstack Engineer',
    'Thông thạo một trong các ngôn ngữ, framework (Python: FastAPI; ES6: NextJS, NuxtJS; Database: Postgresql, ElasticSearch)',
    'Yêu thích làm việc với dữ liệu và xử lý dữ liệu lớn (ETL Data, Data Pipeline, ElasticSearch, PostgreSQL, MySQL).',
    'Siêu lợi thế: Có kinh nghiệm xây dựng, tối ưu sản phẩm đáp ứng lượng truy cập lớn.',
    'Kỹ năng giải quyết vấn đề mức tốt trở lên.',
    'Thành thạo HTML, CSS, Javascript và có kinh nghiệm lập trình với các framework frontend (VueJS, NuxtJS, React, v.v.)',
    'Kiên trì, tỉ mỉ, mưu cầu tiến bộ.',
  ]
  const benifit: string[] = [
    '13 tháng lương, thỏa thuận theo năng lực: 15-35 triệu/ tháng (NET).',
    'Hỗ trợ ăn trưa, vé xe (~1 triệu/ tháng).',
    'Tháng lương 13 chia theo quý, kèm thưởng của công ty.',
    'Chế độ BHXH, BHYT, nghỉ phép theo quy định của nhà nước.',
    'Cơ hội phát triển sự nghiệp rõ ràng: đã có plan sản phẩm 5 năm, còn để mở các vị trí chủ chốt.',
    'Môi trường đồng nghiệp giỏi (năng lực, kinh nghiệm top 1% lĩnh vực) + văn hoá hỗ trợ nhau tiến bộ trong công ty.',
  ]
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.boxInfo}>
          <Text style={styles.boxTitle}>Thông tin chung</Text>
          <View style={!isShow ? styles.listHide : styles.listShow}>
            <View style={styles.item}>
              <View style={styles.boxIcon}>
                <Image source={require('../../assets/images/icon/salary-icon.png')} style={styles.icon} />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTitle}>Mức lương :</Text>
                <Text style={styles.itemContent}>2.000 $</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={styles.boxIcon}>
                <Image source={require('../../assets/images/icon/suitcase-icon.png')} style={styles.icon} />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTitle}>Hình thức làm việc :</Text>
                <Text style={styles.itemContent}>Full time</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={styles.boxIcon}>
                <Image source={require('../../assets/images/icon/people-icon.png')} style={styles.icon} />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTitle}>Số lượng cân tuyển :</Text>
                <Text style={styles.itemContent}>2 người</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={styles.boxIcon}>
                <Image source={require('../../assets/images/icon/gender-icon.png')} style={styles.icon} />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTitle}>Giới tính :</Text>
                <Text style={styles.itemContent}>Không yêu cầu</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={styles.boxIcon}>
                <Image source={require('../../assets/images/icon/medal-icon.png')} style={styles.icon} />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTitle}>Kinh nghiệm :</Text>
                <Text style={styles.itemContent}>Không yêu cầu kinh nghiệm</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={styles.boxIcon}>
                <Image source={require('../../assets/images/icon/role-icon.png')} style={styles.icon} />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTitle}>Chức vụ :</Text>
                <Text style={styles.itemContent}>Fullstack Senior</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={styles.boxIcon}>
                <Image source={require('../../assets/images/icon/location-icon.png')} style={styles.icon} />
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemTitle}>Địa chỉ :</Text>
                <Text style={styles.itemContent}>
                  0905-T2B Tòa nhà TSQ, Phường Mỗ Lao, quận Hà Đông, thành phố Hà Nội.
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => setShow(!isShow)}>
            <Text
              style={{
                textAlign: 'center',
                paddingVertical: 15,
                fontSize: 20,
                color: mainColor,
              }}
            >
              {isShow ? 'Thu gọn' : 'Xem thêm'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boxDesc}>
          <Text style={styles.boxTitle}>Thông tin chung</Text>
          {desc.map((e) => (
            <Text style={{ fontSize: 15, fontWeight: '300', textAlign: 'justify', paddingBottom: 8 }}>
              {'\u25CF' + '  '}
              {e}
            </Text>
          ))}
        </View>
        <View style={styles.boxRequest}>
          <Text style={styles.boxTitle}>Yêu cầu ứng viên</Text>
          {request.map((e) => (
            <Text style={{ fontSize: 15, fontWeight: '300', textAlign: 'justify', paddingBottom: 8 }}>
              {'\u25CF' + '  '}
              {e}
            </Text>
          ))}
        </View>
        <View style={styles.boxBenifit}>
          <Text style={styles.boxTitle}>Quyền lợi</Text>
          {benifit.map((e) => (
            <Text style={{ fontSize: 15, fontWeight: '300', textAlign: 'justify', paddingBottom: 8 }}>
              {'\u25CF' + '  '}
              {e}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 20,
  },
  boxDesc: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    // maxHeight: 520,
    backgroundColor: '#FAFAFA',
    borderRadius: 15,
    marginTop: 20,
  },
  boxRequest: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    // maxHeight: 520,
    backgroundColor: '#FAFAFA',
    borderRadius: 15,
    marginTop: 20,
  },
  boxBenifit: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    // maxHeight: 520,
    backgroundColor: '#FAFAFA',
    borderRadius: 15,
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
