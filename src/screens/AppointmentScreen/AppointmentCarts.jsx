import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  card: {
    height: 80,
    width: 300,
    borderRadius: 8,
    margin: 10,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});

const AppointmentCarts = ({ cartItems }) => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ margin: 5,  flex: 1, width: "100%", }}>
        {Object.values(cartItems).map((item) => (
          <View key={item.id} style={styles.card}>
            <ImageBackground
              source={require('../../../assets/images/cartback1.jpg')}
              style={styles.background}>
              <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.price}>BDT. {item.price}</Text>
              </View>
            </ImageBackground>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default AppointmentCarts;
