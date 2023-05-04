import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { tomtom } from "@tomtom-international/web-sdk-maps";
import TomTomMaps from "../TomTomMaps";
const Marker = () => {
  const [markers, setMarkers] = useState([
    {
      id: 1,
      title: "SVG icon",
      description: "This is an SVG marker",
      icon: require("./assets/svg-marker.svg"),
      latlng: {
        latitude: 42.73919549715691,
        longitude: -120.72217631449985,
      },
    },
  ]);
  return (
    <View>
      <Text>Your Car is here!</Text>
    </View>
  );
};

export default Marker;

const App = () => {
  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker) => (
          <Marker key={marker.id} coordinate={marker.latlng}>
            <Callout>
              <View>
                <Text style={styles.title}>{marker.title}</Text>
                <Text>{marker.description}</Text>
              </View>
            </Callout>
            <Image source={marker.icon} style={styles.marker} />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   marker: {
//     width: 22,
//     height: 22,
//   },
// });
// export default App;
