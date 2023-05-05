import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../Screens/SignUp";
import HomeScreen from "../Screens/HomeScreen";
import SignIn from "../Screens/SignIn";
import ParkedCarForm from "../Screens/ParkedCarForm";
import ParkingInfo from "../Screens/ParkingInfo";

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="ParkedCarForm"
    >
      <Stack.Screen name="Sign In" component={SignIn} />
      <Stack.Screen name="Sign Up" component={SignUp} />
      <Stack.Screen name="Home Screen" component={HomeScreen} />
      <Stack.Screen name="ParkedCarForm" component={ParkedCarForm} />
    </Stack.Navigator>
  );
}
