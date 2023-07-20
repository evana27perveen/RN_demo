import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useCookies } from 'react-cookie';
import WebView from 'react-native-webview';
// import * as FileSystem from 'expo-file-system';

const ResultCards = () => {
  const [results, setResults] = useState([]);
  const [token] = useCookies(['myToken']);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      // Fetch test results
      const response = await fetch('https://healthbackend.evanaperveen1.repl.co/api/main/test-results/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }

      const data = await response.json();

      const resultData = await Promise.all(
        data.map(async (result) => {
          // Fetch related sample data
          const sampleResponse = await fetch(`https://healthbackend.evanaperveen1.repl.co/api/main/medical-samples/${result.medical_sample}/`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.access_token}`,
            },
          });

          if (!sampleResponse.ok) {
            throw new Error('Failed to fetch sample data');
          }

          const sampleData = await sampleResponse.json();

          // Fetch related appointment data
          const appointmentResponse = await fetch(`https://healthbackend.evanaperveen1.repl.co/api/main/appointments/${sampleData.appointment}/`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.access_token}`,
            },
          });

          if (!appointmentResponse.ok) {
            throw new Error('Failed to fetch appointment data');
          }

          const appointmentData = await appointmentResponse.json();

          // Fetch related services data
          const serviceResponse = await fetch(`https://healthbackend.evanaperveen1.repl.co/api/main/services/${appointmentData.service}/`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.access_token}`,
            },
          });

          if (!serviceResponse.ok) {
            throw new Error('Failed to fetch services data');
          }

          const servicesData = await serviceResponse.json();
          const serviceNames = servicesData.services.map(service => service.test_name);

          return {
            ...result,
            serviceNames,
            collection_date: sampleData.collection_date,
            collection_time: sampleData.collection_time,
            sample_type: sampleData.sample_type,
            totalPrice: servicesData.services.reduce((sum, service) => sum + service.price, 0),
          };
        })
      );

      setResults(resultData);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleDownload = async (resultDocument) => {
  //   try {
  //     const response = await fetch(resultDocument);
  //     const blob = await response.blob();

  //     const fileUri = FileSystem.documentDirectory + 'result_document.pdf';

  //     await FileSystem.writeAsStringAsync(fileUri, blob, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });

  //     const downloadPath = FileSystem.cacheDirectory + 'result_document.pdf';
  //     await FileSystem.moveAsync({
  //       from: fileUri,
  //       to: downloadPath,
  //     });

  //     console.log('Downloaded file:', downloadPath);

  //     // Open the downloaded file
  //     await FileSystem.openAsync(downloadPath);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>Test Result:</Text>
        
      </View>
      <View style={styles.serviceContainer}>
        <Text style={styles.serviceTitle}>Services:</Text>
        {item.serviceNames.map((serviceName, index) => (
          <Text key={index} style={styles.serviceName}>
            {`${index + 1}. ${serviceName}`}
          </Text>
        ))}
      </View>
      <Text style={styles.collectionDateTime}>
        Collection Date: {item.collection_date}, Collection Time: {item.collection_time}
      </Text>
      <Text style={styles.result}>{item.result}</Text>
      <Text style={styles.totalPrice}>Total Cost: {item.totalPrice}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    textAlign: 'center',
    justifyContent: 'center',
  },
  cardHeader: {
    backgroundColor: '#eaeaea',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center',
    justifyContent: 'center',
    
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    
  },
  serviceContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  serviceName: {
    fontSize: 14,
    marginBottom: 2,
    marginLeft: 20,
  },
  collectionDateTime: {
    fontSize: 12,
    marginBottom: 10,
  },
  result: {
    backgroundColor: '#eaeaea',
    fontSize: 14,
    borderRadius: 8,
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
  totalPrice: {
    fontSize: 14,
    marginBottom: 10,
  },
  downloadLink: {
    fontSize: 14,
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 15,
    textDecorationLine: 'none',
    marginBottom: 10,
    textAlign: 'center',
  },
  pdfContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  webView: {
    flex: 1,
    height: 10, // Adjust the height as needed
  },
  success: {
    textDecorationLine: 'none',
    color: 'green',
    justifyContent: 'center',
    textAlign: 'center',
  }
});

export default ResultCards;
