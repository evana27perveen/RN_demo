import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
  button: {
    backgroundColor: '#f0ca78',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const group = 'PATIENT'
  

  const navigation = useNavigation();


  const handleSignUp = async (e) => {

    e.preventDefault();

    // Validate email
    if (!username) {
      console.error('Email / Phone Number is required');
      return;
    }
  
  
    // Validate password
    if (!password) {
      console.error('Password is required');
      return;
    }
  
    if (password.length < 8) {
      console.error('Password must be at least 8 characters long');
      return;
    }
  
    // Validate confirm password
    if (confirmPassword !== password) {
      console.error('Passwords do not match');
      return;
    }

  let formData = new FormData();

  formData.append("username", username);
  formData.append("password", password);
  formData.append("group_name", group);

  let requestOption = {
    method: "POST",
    body: formData,
    redirect: "follow"
  };

  try {
    const response = await fetch('https://healthbackend.evanaperveen1.repl.co/api/auth/user/create/', requestOption);
    const responseData = await response.text();
    const jsonResponse = JSON.parse(responseData);

    console.log('success', jsonResponse);
    navigation.navigate('Login');
  } catch (error) {
    console.log('Error:', error);
    Swal.fire({
      title: 'Error',
      text: 'An error occurred while signing up. Please try again later.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
};

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/blood.png')}
        style={{ width: 400, height: 200, resizeMode: 'contain' }}/>
      <Text style={styles.title}>Sign Up</Text>
<View style={styles.inputContainer}>

<TextInput
       style={styles.input}
       placeholder="Email / Phone Number"
       keyboardType="email-address"
       onChangeText={setUsername}
       value={username}
     />
<TextInput
       style={styles.input}
       placeholder="Password"
       secureTextEntry
       onChangeText={setPassword}
       value={password}
     />
<TextInput
       style={styles.input}
       placeholder="Confirm Password"
       secureTextEntry
       onChangeText={setConfirmPassword}
       value={confirmPassword}
     />
</View>
<View style={{ width: '80%', borderRadius: 5, }}>
  <Button
    title="Sign Up"
    onPress={handleSignUp}
    disabled={!username || !password || !confirmPassword}
    color="#3180e7"
    accessibilityLabel="Sign up button"
  >
  </Button>
</View>

<Text style={{ marginTop: 16 }}>Already have an account? 
  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
    <Text style={{ color: '#3180e7' }}> Login here</Text>
  </TouchableOpacity>
</Text>

</View>
);
};

export default SignUp;
