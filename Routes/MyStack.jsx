import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';

const Stack = createStackNavigator();

export default function MyStack() {
    return (
        <Stack.Navigator initialRouteName='Sign Up'>
            <Stack.Screen name='Sign In' component={SignIn} />
            <Stack.Screen name='Sign Up' component={SignUp} />
            <Stack.Screen name='Home Screen' component={HomeScreen} />
        </Stack.Navigator>
    );
}