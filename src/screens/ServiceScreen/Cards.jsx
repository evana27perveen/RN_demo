import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 16,
    width: '100%',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: '#3180e7',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3180e7',
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ffff',
    paddingTop: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    opacity: 0.9,
    marginTop: 10,
  },
  icon: {
    marginBottom: 8,
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(14, 172, 35, 0.6)',
    borderRadius: 12,
    padding: 4,
  },
  checkmarkIcon: {
    color: '#fff',
  },
});

const Cards = ({ handleCartList }) => {
  const [serviceData, setServiceData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleCartList(cartList, cartItems);
  }, [cartList]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://healthbackend.evanaperveen1.repl.co/api/main/service-models/');
      const data = await response.json();
      setServiceData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCardPress = (serviceId, serviceName, servicePrice) => {
    setSelectedCards((prevSelectedCards) => {
      if (prevSelectedCards.includes(serviceId)) {
        return prevSelectedCards.filter((id) => id !== serviceId);
      } else {
        return [...prevSelectedCards, serviceId];
      }
    });

    setCartList((prevCartList) => {
      if (prevCartList.includes(serviceId)) {
        return prevCartList.filter((id) => id !== serviceId);
      } else {
        return [...prevCartList, serviceId];
      }
    });

    setCartItems((prevCartItems) => {
      if (prevCartItems[serviceId]) {
        const { [serviceId]: _, ...updatedCartItems } = prevCartItems;
        return updatedCartItems;
      } else {
        return {
          ...prevCartItems,
          [serviceId]: {
            id: serviceId,
            name: serviceName,
            price: servicePrice,
          },
        };
      }
    });
  };

  return (
    <View>
      <ImageBackground
        source={require('../../../assets/images/bloodb.png')}
        style={styles.backgroundImage}
      >
        <ScrollView>
          <View style={styles.container}>
            {serviceData.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={[styles.card, selectedCards.includes(service.id) && styles.selectedCard]}
                onPress={() => handleCardPress(service.id, service.test_name, service.price)}
              >
                {selectedCards.includes(service.id) && (
                  <View style={styles.checkmark}>
                    <FontAwesome5 name="check" size={12} style={styles.checkmarkIcon} />
                  </View>
                )}
                <FontAwesome5 name="hand-holding-medical" size={24} color="#3180e7" style={styles.icon} />
                <Text style={styles.title}>{service.test_name}</Text>
                <Text style={styles.price}>BDT. {service.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Cards;
