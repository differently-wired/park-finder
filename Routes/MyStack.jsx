import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import SignIn from '../Screens/SignIn';

const Stack = createStackNavigator();

export default function MyStack() {
    return (
        <Stack.Navigator initialRouteName='SignIn'>
            <Stack.Screen name='SignIn' component={SignIn} />
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
        </Stack.Navigator>
    );
}