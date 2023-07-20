import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  ImageBackground,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { useCookies } from 'react-cookie';
import AppointmentModal from './AppointmentModal';

const AppointmentList = ({ appointments }) => {
  const [token] = useCookies(['myToken']);
  const animValue = useRef(new Animated.Value(0)).current;
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    animateCards();
  }, []);

  const animateCards = () => {
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const cardAnimatedStyles = {
    transform: [
      {
        translateX: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-200, 0],
        }),
      },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Requested':
        return '#053d86';
      case 'Cancelled':
        return '#c70404';
      case 'Missed':
        return '#7a0404';
      case 'Completed':
        return 'green';
      case 'Confirmed':
        return '#9e0791';
      default:
        return 'black';
    }
  };

  const handleCardPress = async (appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
    await fetchAppointmentServices(appointment);
  };

  const fetchAppointmentServices = async (appointment) => {
    try {
      const response = await fetch(
        `https://healthbackend.evanaperveen1.repl.co/api/main/services/${appointment.service}/`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setServices(data.services);
    } catch (error) {
      console.log('Error fetching appointment services:', error);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <Animated.View
        style={[
          styles.appointmentItem,
          index % 2 === 0 ? cardAnimatedStyles : {},
        ]}
      >
        <TouchableOpacity
          style={styles.appointmentItemContent}
          onPress={() => handleCardPress(item)}
        >
          <ImageBackground
            source={require('../../../assets/images/page1.png')}
            style={styles.backgroundImage}
            imageStyle={styles.backgroundImageStyle}
          >
            <View style={styles.itemContainer}>
              <View style={styles.appointmentDetails}>
                <Text style={styles.addressText}>{item.collection_address}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
              <Text
                style={[
                  styles.statusText,
                  { color: getStatusColor(item.status) },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {appointments.length > 0 ? (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noAppointmentsText}>No appointments found.</Text>
      )}

      <Modal visible={modalVisible} animationType="slide">
        <AppointmentModal
          appointment={selectedAppointment}
          services={services}
          closeModal={closeModal}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    width: '99%',
  },
  appointmentItem: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 65,
  },
  appointmentItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  appointmentDetails: {
    flex: 1,
    marginRight: 10,
  },
  addressText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  dateText: {
    fontSize: 14,
    marginBottom: 3,
  },
  timeText: {
    fontSize: 14,
    marginBottom: 3,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  noAppointmentsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
  },
  backgroundImageStyle: {
    opacity: 0.8,
    borderRadius: 25,
  },
});

export default AppointmentList;
