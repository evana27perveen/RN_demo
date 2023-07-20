import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { useCookies } from 'react-cookie';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3180e7',
    borderBottomStyle: 'solid',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3180e7',
  },
});

const Header = ({ title }) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.headerText}>{title}</Text>
        <View style={{ width: 24 }}></View>
      </View>
    </View>
  );
};

export default Header;
