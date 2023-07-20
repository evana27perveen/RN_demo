import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignUp from './src/screens/AuthScreen/SignUp';
import Login from './src/screens/AuthScreen/Login';
import Profile from './src/screens/AuthScreen/Profile';
import ProfileUpdate from './src/screens/AuthScreen/ProfileUpdate';
import Home from './src/screens/HomeScreen/Home';
import Services from './src/screens/ServiceScreen/Services';
import Appointment from './src/screens/AppointmentScreen/Appointment';
import Results from './src/screens/ResultScreen/Results';
import MyAppointments from './src/screens/AppointmentScreen/MyAppointments';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Appointment"
            component={Appointment}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Services"
            component={Services}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProfileUpdate"
            component={ProfileUpdate}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MyAppointments"
            component={MyAppointments}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Results"
            component={Results}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
