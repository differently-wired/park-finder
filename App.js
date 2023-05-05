import { NavigationContainer } from "@react-navigation/native";
// import MyStack from "./Routes/MyStack";
import { UserInfoProvider } from "./contexts/UserInfo";
import Tabs from "./navigation/tabs";

export default function App() {
  return (
    <UserInfoProvider>
      <NavigationContainer>
        {/* <MyStack /> */}
        <Tabs />
      </NavigationContainer>
    </UserInfoProvider>
  );
}

// import * as React from "react";
// import { Button, Text, View } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";
// import SignIn from "./Screens/SignIn";
// function DetailsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Details!</Text>
//     </View>
//   );
// }
// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Home screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate("SignIn")}
//       />
//     </View>
//   );
// }
// function SettingsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Settings screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate("Details")}
//       />
//     </View>
//   );
// }
// const HomeStack = createStackNavigator();
// function HomeStackScreen() {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen name="Home" component={HomeScreen} />{" "}
//       <HomeStack.Screen name="Details" component={HomeScreen} />
//     </HomeStack.Navigator>
//   );
// }
// const SettingsStack = createStackNavigator();
// function SettingsStackScreen() {
//   return (
//     <SettingsStack.Navigator>
//       <SettingsStack.Screen name="Settings" component={HomeScreen} />
//       <SettingsStack.Screen name="Details" component={HomeScreen} />
//     </SettingsStack.Navigator>
//   );
// }
// const Tab = createBottomTabNavigator();
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;
//             if (route.name === "Home") {
//               iconName = focused ? "home-outline" : "home-outline";
//             } else if (route.name === "Pin") {
//               iconName = focused ? "pin" : "pin";
//             }

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: "tomato",
//           inactiveTintColor: "gray",
//         }}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Pin" component={SignIn} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
