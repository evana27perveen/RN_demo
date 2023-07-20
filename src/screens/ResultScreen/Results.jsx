import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../HomeScreen/Header'
import BottomNavBar from '../HomeScreen/BottomNavBar';
import ResultCards from './ResultCards';

const Results = () => {

  const handleCartList = (list, items) => {
    setCartList(list);
    setCartItems(items);
  };
  

  return (
    <View style={{ flex: 1, margin: 5, flexDirection: 'column'}}>
      <Header title="Test Reports"/>
      <View style={{ flex: 1,  alignItems: 'center' }}>
        <ResultCards/>
      </View>
      <BottomNavBar/>
    </View>
  );
};

export default Results;
