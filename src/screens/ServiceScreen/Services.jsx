import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../HomeScreen/Header'
import BottomNavBar from '../HomeScreen/BottomNavBar';
import Cards from './Cards';

const Services = () => {
  const [cartList, setCartList] = useState([]);
  const [cartItems, setCartItems] = useState({});

  const handleCartList = (list, items) => {
    setCartList(list);
    setCartItems(items);
  };
  

  return (
    <View style={{ flex: 1, margin: 5, flexDirection: 'column'}}>
      <Header title="Services"/>
      <View style={{ flex: 1,  alignItems: 'center' }}>
      <Cards handleCartList={handleCartList} />
      </View>
      <BottomNavBar cartList={cartList} cartItems={cartItems} />
    </View>
  );
};

export default Services;
