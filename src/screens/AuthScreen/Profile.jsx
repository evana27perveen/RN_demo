import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useCookies } from 'react-cookie';
import Header from '../HomeScreen/Header'
import BottomNavBar from '../HomeScreen/BottomNavBar';
import ProfileDisplay from './ProfileDisplay';

const Profile = () => {
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(new Date());
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [token] = useCookies(['myToken']);
  const [group] = useCookies(['myGroup']);
  

  const createProfile = () => {
    const formData = new FormData();
    formData.append('full_name', fullName);
    formData.append('gender', gender);
    formData.append('dob', dob.toISOString().slice(0, 10));
    formData.append('email', email);
    formData.append('phone_number', phoneNumber);
    fetch('https://healthbackend.evanaperveen1.repl.co/api/main/patient-profiles/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token.access_token}`,
      },
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(false);
    setDob(currentDate);
    console.log(dob);
  };

  return (
    <View style={{ flex: 1, margin: 5, flexDirection: 'column'}}>
      <Header title="Profile"/>
      {token.profile === 'True' ? (
      <ProfileDisplay />
    ) : (
      <View style={styles.container}>
          <Text style={styles.title}>Create Profile</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
            <View style={styles.radioGroup}>
              <Text style={styles.radioLabel}>Gender:</Text>
              <TouchableOpacity
                style={gender === 'M' ? styles.radioButtonActive : styles.radioButton}
                onPress={() => setGender('M')}
              >
                <Text style={styles.radioButtonText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={gender === 'F' ? styles.radioButtonActive : styles.radioButton}
                onPress={() => setGender('F')}
              >
                <Text style={styles.radioButtonText}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={gender === 'O' ? styles.radioButtonActive : styles.radioButton}
                onPress={() => setGender('O')}
              >
                <Text style={styles.radioButtonText}>Other</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                {dob.toLocaleDateString()}
              </Text>
              <View style={styles.iconContainer}>
              <Fontisto name="date" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <Button
              title="Create Profile"
              onPress={createProfile}
            />
          </View>
        </View>
    )}
        
      

    
    <BottomNavBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#030303',
    marginBottom: 16,
    padding: 8,
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioLabel: {
    marginRight: 16,
    fontSize: 16,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#030303',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 5,
  },
  radioButtonActive: {
    borderWidth: 1,
    borderColor: '#3180e7',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    backgroundColor: '#3180e7',
  },
  radioButtonText: {
    fontSize: 13,
    color: '#000',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#030303',
    marginBottom: 16,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#000',
    marginRight: 8,
  },
  iconContainer: {
    backgroundColor: '#3180e7',
    borderRadius: 8,
    padding: 8,
  },
  iconText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Profile;
