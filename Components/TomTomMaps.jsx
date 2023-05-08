import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import { WebView } from "react-native-webview";
import { MapTemplate } from "../templates/map-template";
import * as Location from "expo-location";
import { mapStyles } from "../Styles/styles";

export default function TomTomMaps() {
  // webRef to be used for scroller
  let webRef = undefined;
  let [mapCenter, setMapCenter] = useState("");
  const [userLocation, setUserLocation] = useState({});
  const [carLocation, setCarLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    // get user location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});

      const { longitude, latitude } = currentLocation.coords;
      setUserLocation({ longitude, latitude });
    })();

    // get pinned car location
    // TODO change this to get the pinned location from the database
    // If there is no pinned location. DO NOT set this and marker will not appear.
    // EXAMPLE: setCarLocation({ longitude: -2.697894, latitude: 53.553993 });
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (userLocation) {
    text = JSON.stringify(userLocation);
  }

  const handleMapEvent = (event) => {
    setMapCenter(event.nativeEvent.data);
  };

  return (
    <View style={mapStyles.container}>
      <View style={mapStyles.buttons}>
        <TextInput
          style={mapStyles.textInput}
          onChangeText={setMapCenter}
          value={mapCenter}
        ></TextInput>
      </View>
      <WebView
        ref={(r) => (webRef = r)}
        onMessage={handleMapEvent}
        style={mapStyles.map}
        originWhitelist={["*"]}
        source={{
          html: MapTemplate(userLocation, carLocation),
        }}
      />
    </View>
  );
}

