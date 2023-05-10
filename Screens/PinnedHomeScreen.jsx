import { Button, StyleSheet, View } from "react-native";
import TomTomMaps from "../Components/TomTomMaps";
import { UserInfoContext } from "../contexts/UserInfo";
import { useContext } from "react";
import React, { useEffect } from "react";
import { useState } from "react";
import { WebView } from "react-native-webview";
import { MapTemplate } from "../templates/map-template";
import * as Location from "expo-location";
// import NotificationSender from "../Components/NotificationSender";
export default function PinnedHomeScreen() {
  const { userInfo } = useContext(UserInfoContext);
  // webRef to be used for scroller
  let webRef = undefined;
  let [mapCenter, setMapCenter] = useState("");
  const [userLocation, setUserLocation] = useState({});
  const [carLocation, setCarLocation] = useState({});
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    // get user location
    (async () => {
      let currentLocation = await Location.getCurrentPositionAsync({});

      const { longitude, latitude } = currentLocation.coords;
      setUserLocation({ longitude, latitude });
    })();

    // get car location from user/db
    // If there is no pinned location. DO NOT set this and marker will not appear.
    setCarLocation({ longitude: -2.238253, latitude: 53.47214 });
  }, []);

  let text = "Waiting...";
  if (userLocation) {
    text = JSON.stringify(userLocation);
  }

  const handleMapEvent = (event) => {
    setMapCenter(event.nativeEvent.data);
  };

  return (
    <View style={styles.container}>
      {/* Temp button to enable/disable navigation */}
      <Button title="Find Car" onPress={() => setTracking(!tracking)} />
      {/* ---------------------------------------- */}
      <WebView
        ref={(r) => (webRef = r)}
        onMessage={handleMapEvent}
        style={styles.map}
        originWhitelist={["*"]}
        source={{
          html: MapTemplate(userLocation, carLocation, tracking),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    width: "100%",
    height: "85%",
  },
  map: {
    width: "100%",
    height: "85%",
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 22,
    height: 22,
  },
});
