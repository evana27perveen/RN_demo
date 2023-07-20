import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Easing, Text } from 'react-native';

const ProgressBar = () => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const rotateInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.circle, { transform: [{ rotate: rotateInterpolation }] }]}
      />
      <Text style={styles.text}>loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#ccc',
    borderTopColor: '#3180e7',
    borderRightColor: '#3180e7',
    borderBottomColor: '#3180e7',
  },
  text: {
    marginTop: 10,
  }
});

export default ProgressBar;
