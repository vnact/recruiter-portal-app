import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Filter } from '../../components/Filter';
import { TopCompany } from '../../components/TopCompany';
import { ListJobCard } from '../../components/ListJobCard';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Filter />
      <TopCompany />
      <ListJobCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FCFCFCFC',
  },
});
