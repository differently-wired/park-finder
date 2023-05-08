import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';
import Tabs from './tabs';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="HomeScreen" component={Tabs} />
    </Stack.Navigator>
  );
};

export default AppNavigation;