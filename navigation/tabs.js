// Tabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import SignIn from '../Screens/SignIn';
import ParkedCarForm from '../Screens/ParkedCarForm';
import { tabStyles } from '../Styles/styles.js';
import { HomeIcon, CameraIcon, ProfileIcon } from '../navigation/tabsIcon';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator screenOptions={{ tabBarStyle: tabStyles }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: HomeIcon,
                }}
            />
            <Tab.Screen
                name="Camera"
                component={ParkedCarForm}
                options={{
                    tabBarLabel: 'Camera',
                    tabBarIcon: CameraIcon,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={SignIn}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ProfileIcon,
                }}
            />
        </Tab.Navigator>
    );
};

export default Tabs;
