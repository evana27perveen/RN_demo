import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from './Header';
import BottomNavBar from './BottomNavBar';
import Slides from './Slides';
import InfoBoxes from './InfoBoxes';

const Home = () => {
  

  return (
    <View style={{ flex: 1, margin: 5, flexDirection: 'column'}}>
      <Header title="Home"/>
      <View style={{ flex: 1,  alignItems: 'center' }}>
        <Slides/>
      </View>
      <View style={{ flex: 1,  alignItems: 'center' }}>
        <InfoBoxes/>
      </View>
      <BottomNavBar/>
    </View>
  );
};

export default Home;
