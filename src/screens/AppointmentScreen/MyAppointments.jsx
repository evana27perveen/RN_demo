import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useCookies } from 'react-cookie';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../HomeScreen/Header';
import BottomNavBar from '../HomeScreen/BottomNavBar';
import AppointmentList from './AppointmentList';
import ProgressBar from '../HomeScreen/ProgressBar';

const MyAppointments = () => {
  const [token] = useCookies(['myToken']);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchAppointments();
      return () => {};
    }, [])
  );

  const fetchAppointments = async () => {
    try {
      const response = await fetch('https://healthbackend.evanaperveen1.repl.co/api/main/appointments/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      const data = await response.json();
      setAppointments(data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching appointments:', error);
      setLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      <Header title="My Appointments" />
      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
          <ProgressBar />
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <AppointmentList appointments={appointments} />
        </View>
      )}
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    flexDirection: 'column',
  },
});

export default MyAppointments;
