import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../Screens/SignUp";
import HomeScreen from "../Screens/Homescreen";
import UploadImage from "../Screens/UploadImage";

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="UploadImage" component={UploadImage} />
    </Stack.Navigator>
  );
}
