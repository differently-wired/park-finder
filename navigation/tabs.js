import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import SignIn from "../Screens/SignIn";
import SignUp from "../Screens/SignUp";
import ParkedCarForm from "../Screens/ParkedCarForm";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();
// const CustomTabBarButton = (children, onPress) => {
//   <TouchableOpacity onPress={onPress} style={styles.centreButton}>
//     <View style={styles.view}>{children}</View>
//   </TouchableOpacity>;
// };

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

const Tabs = () => {
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
          // tabBarVisible: route.state && route.state.index === 0,
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
          //   tabBarVisible: getTabBarVisibility(route),
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
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === "HomeScreen") {
//             iconName = focused
//               ? "ios-information-circle"
//               : "ios-information-circle-outline";
//           } else if (route.name === "Settings") {
//             iconName = focused ? "ios-list" : "ios-list-outline";
//           }

//           // You can return any component that you like here!
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "tomato",
//         tabBarInactiveTintColor: "gray",
//       })}
//       screenOptions={{
//         tabBarShowLabel: false,
//         // tabBarBadge: 3,
//         tabBarIconStyle: { color: "black" },
//         tabBarStyle: styles.tabBar,
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarIcon: () => {
//             <View style={styles.button}>
//               <Image
//                 source={require("../assets/icon.png")}
//                 resizeMode="contain"
//                 style={styles.tabIcon}
//               />
//               <Text style={styles.tabText}>Homee</Text>;
//             </View>;
//           },
//         }}
//       />
//       <Tab.Screen name="Camera" component={ParkedCarForm} />
//       <Tab.Screen name="SignIn" component={SignIn} />
//       <Tab.Screen name="SignUp" component={SignUp} />
//     </Tab.Navigator>
//   );
// };

styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: "white",
    borderRadius: 15,
    height: 90,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    top: 10,
  },
  centreButton: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
  },
  tabIcon: {
    width: 25,
    height: 25,
    // color: "black",
  },
  tabText: {
    width: 25,
    height: 25,
    color: "black",
    fontSize: 12,
  },
  view: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#e32f45",
  },
});

export default Tabs;
