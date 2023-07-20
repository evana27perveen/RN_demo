import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useCookies } from 'react-cookie';
import { useNavigation, useRoute } from '@react-navigation/native';


const AppointmentForm = ({ cartList }) => {
  const [token] = useCookies(['myToken']);
  const [collectionAddress, setCollectionAddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const navigation = useNavigation();
  

  const handleDateChange = (selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      setTime(formattedTime);
    }
  };

  const handleCreateAppointment = () => {
    if (!cartList || !time) {
      console.log('Service and Time are required');
      return;
    }

    console.log(cartList);

    const formData = new FormData();
    formData.append('collection_address', collectionAddress);
    formData.append('date', date.toISOString().slice(0, 10));
    formData.append('time', time);
    formData.append('services', `[${cartList}]`); 
    formData.append('status', 'Requested');

    fetch('https://healthbackend.evanaperveen1.repl.co/api/main/new-appointment/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Server response:', data);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Collection Address"
          value={collectionAddress}
          onChangeText={setCollectionAddress}
        />
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {date.toLocaleDateString()}
          </Text>
          <View style={styles.iconContainer}>
            <Fontisto name="date" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          onConfirm={handleDateChange}
          onCancel={() => setShowDatePicker(false)}
        />
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {time ? time : 'Select Time'}
          </Text>
          <View style={styles.iconContainer}>
            <Fontisto name="clock" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={showTimePicker}
          mode="time"
          onConfirm={handleTimeChange}
          onCancel={() => setShowTimePicker(false)}
        />
        <Button
          title="Confirm Appointment"
          onPress={handleCreateAppointment}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    margin: 5,
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 10,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#030303',
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
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
});

export default AppointmentForm;
