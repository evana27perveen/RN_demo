import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const Slides = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={require('../../../assets/images/tc4.jpeg')} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Empowering Accurate Diagnosis</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 5,
    marginBottom: 0,
    
  },
  image: {
    width: 330,
    height: 200,
    borderBottomLeftRadius: 165,
    borderBottomRightRadius: 165,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3180e7',
    marginBottom: 0,
  },
  textContainer: {
    top: '15%',
    transform: [{ translateY: -25 }],
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 19,
    fontWeight: 'bold',
  },
});

export default Slides;
