import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { primaryColor } from '../constants/Colors';
import React, { FC } from 'react';
import { Feather } from '@expo/vector-icons';

interface IJob {
  id: string;
  name: string;
}

interface ItemProps {
  item: IJob;
}

const listFilter: IJob[] = [
  {
    id: '1',
    name: 'Programming',
  },
  {
    id: '2',
    name: 'Design',
  },
  {
    id: '3',
    name: 'Marketing',
  },
  {
    id: '4',
    name: 'Sales',
  },
];

const Item: FC<ItemProps> = ({ item }) => {
  const [listSelected, setListSelected] = React.useState<string[]>([]);
  const handleSelected = (id: string) => {
    if (listSelected.includes(id)) {
      setListSelected(listSelected.filter((item) => item !== id));
    } else {
      setListSelected([...listSelected, id]);
    }
  };

  return (
    <TouchableOpacity onPress={() => handleSelected(item.id)}>
      {listSelected.includes(item.id) ? (
        <View style={{ ...styles.item, backgroundColor: primaryColor }}>
          <Text style={{ ...styles.text, color: '#FFFFFF' }}>{item.name}</Text>
        </View>
      ) : (
        <View style={styles.item}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export const Filter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Feather name="filter" size={25} />
      </View>
      <View style={styles.listItem}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={listFilter}
          renderItem={({ item, index }) => <Item item={item} key={index} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 45,
    height: 45,
    backgroundColor: '#FDFDFD',
    padding: 5,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FAFAFA',
  },
  listItem: {
    flex: 1,
  },
  item: {
    minWidth: 45,
    minHeight: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDFDFD',
    borderRadius: 15,
    paddingLeft: 12,
    paddingRight: 12,
    pađingTop: 5,
    paddingBottom: 5,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#FAFAFA',
  },
  text: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
  },
});
