import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import SignIn from "../Screens/SignIn";
import SignUp from "../Screens/SignUp";
import ParkedCarForm from "../Screens/ParkedCarForm";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";
import LogoTitle from "../Components/LogoTitle";
import React, { useState } from "react";
import Profile from "../Screens/Profile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  const [imgUri, setImgUri] = useState(null);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2e64e5",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ route }) => ({
          tabBarLabel: "Home",
          //   tabBarVisible: route.state && route.state.index === 0,
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
        name="Park Car"
        component={ParkedCarForm}
        options={({ route }) => ({
          //   tabBarVisible: getTabBarVisibility(route),
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          //   tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function AppNavigation(props) {
  return (
    <Stack.Navigator
      initialRouteName="Sign In"
      // screenOptions={{
      //   headerShown: false,
      // }}
      // screenOptions={{ headerRight: () => <ActionBarImage /> }}
      // screenOptions={{ title: "" }}
      screenOptions={{
        headerTitle: () => <LogoTitle />,
        headerLeft: () => null,
      }}
    >
      <Stack.Screen name="Sign In" component={SignIn} />
      <Stack.Screen name="Sign Up" component={SignUp} />
      <Stack.Screen name="Home Screen" component={Tabs} />
      <Stack.Screen name="ParkedCarForm" component={ParkedCarForm} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
export default AppNavigation;
