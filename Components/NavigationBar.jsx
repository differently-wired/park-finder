// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === "Home") {
//               iconName = focused
//                 ? "ios-information-circle"
//                 : "ios-information-circle-outline";
//             } else if (route.name === "Settings") {
//               iconName = focused ? "ios-list" : "ios-list-outline";
//             }

//             // You can return any component that you like here!
//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: "tomato",
//           tabBarInactiveTintColor: "gray",
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
