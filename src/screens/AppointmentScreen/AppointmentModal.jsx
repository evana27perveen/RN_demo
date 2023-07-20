import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const AppointmentModal = ({ appointment, services, closeModal }) => {
  // Calculate the total price
  const totalPrice = services.reduce((total, service) => total + service.price, 0);

  return (
    <View style={styles.modalContainer}>
      <ImageBackground
        source={require('../../../assets/images/m1.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalHeaderText}>Appointment Details</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              <Text style={styles.tableField}>Address:</Text>
              <Text style={styles.tableValue}>{appointment.collection_address}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableField}>Date:</Text>
              <Text style={styles.tableValue}>{appointment.date}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableField}>Time:</Text>
              <Text style={styles.tableValue}>{appointment.time}</Text>
            </View>
          </View>
          <Text style={styles.modalHeaderText}>Tests: </Text>
          <View style={styles.tableContainer}>
            {services.map((service, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableField}>{index + 1}:</Text>
                <Text style={styles.tableValue}>{service.test_name}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.modalHeaderText}>Total Price: {totalPrice}  BDT</Text>
        </View>
      </ImageBackground>
      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
  },
  modalContent: {
    borderRadius: 10,
    padding: 20,
    marginLeft: 25,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    color: 'white',
    
  },
  tableContainer: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  tableField: {
    fontWeight: 'bold',
    color: 'white',
  },
  tableValue: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#3180e7',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AppointmentModal;
