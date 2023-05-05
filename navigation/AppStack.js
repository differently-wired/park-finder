import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import SignIn from "../Screens/SignIn";
import SignUp from "../Screens/SignUp";
import ParkedCarForm from "../Screens/ParkedCarForm";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Sign In"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Sign In" component={SignIn} />
      <Stack.Screen name="Sign Up" component={SignUp} />
      <Stack.Screen name="Home Screen" component={HomeScreen} />
      <Stack.Screen name="ParkedCarForm" component={ParkedCarForm} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "";

    if (routeName === "ParkedCarForm") {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#2e64e5",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ route }) => ({
          tabBarLabel: "Home",
          tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Camera"
        component={ParkedCarForm}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={SignIn}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
