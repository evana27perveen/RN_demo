import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Animated, ImageBackground, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCookies } from 'react-cookie';
import { useNavigation } from '@react-navigation/native';

const ProfileDisplay = () => {
  const [token] = useCookies(['myToken']);
  const [profile, setProfile] = useState(null);
  const navigation = useNavigation();
  const fadeAnim = useState(new Animated.Value(0))[0];
  const translateAnim = useState(new Animated.Value(100))[0];

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = () => {
    fetch('https://healthbackend.evanaperveen1.repl.co/api/main/patient-profiles/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.access_token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const profile = data[0];
          setProfile(profile);
          startAnimations();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const startAnimations = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleEditProfile = () => {
    // Implement your edit profile logic here
    console.log('Edit Profile');
  };

  if (!profile) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3180e7" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  const getGenderText = () => {
    if (profile.gender === 'M') {
      return 'Male';
    } else if (profile.gender === 'F') {
      return 'Female';
    } else {
      return 'Undefined';
    }
  };

  return (
    <ImageBackground source={require('../../../assets/images/proback.jpg')} style={styles.container}>
      <Animated.View style={[styles.cardContainer, { opacity: fadeAnim, transform: [{ translateY: translateAnim }] }]}>
        <Text style={styles.title}>Profile Information</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.value}>{profile.full_name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{getGenderText()}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{profile.dob}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{profile.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.value}>{profile.phone_number}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileUpdate')} style={styles.editButton}>
          <View style={styles.editButtonContent}>
            <MaterialCommunityIcons name="account-edit" size={25} color="white" style={styles.icon} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 4,
    textAlign: 'center',
  },
  value: {
    fontSize: 16,
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 16,
  },
  editButton: {
    marginTop: 15,
    backgroundColor: '#3180e7',
    paddingVertical: 5,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  editButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileDisplay;
