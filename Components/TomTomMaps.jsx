import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { Button, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { MapTemplate } from "../templates/map-template";
import * as Location from "expo-location";
import { getParkedCarImageFromStorage, getUserAccount } from "../utils/dbApi";
import { UserInfoContext } from "../contexts/UserInfo";

export default function TomTomMaps() {
  // webRef to be used for scroller
  let webRef = undefined;
  let [mapCenter, setMapCenter] = useState("");
  const [userLocation, setUserLocation] = useState({});
  const [carLocation, setCarLocation] = useState({});
  const [tracking, setTracking] = useState(false);
  const [imgUri, setImgUri] = useState(null);
  const { userInfo } = useContext(UserInfoContext);

  useEffect(() => {
    // get user location
    (async () => {
      let currentLocation = await Location.getCurrentPositionAsync({});

      const { longitude, latitude } = currentLocation.coords;
      setUserLocation({ longitude, latitude });
    })();

    //get car img from user/db
    // If user has no active parking, DO NOT set this and image will not appear.
    (async () => {
      if (userInfo.activeParking === true) {
        (async () => {
          try {
            let carImg = await getParkedCarImageFromStorage();
            setImgUri(carImg);
          } catch (error) {
            console.log(error);
          }
        })();

        // get car location from user/db
        // If there is no pinned location. DO NOT set this and marker will not appear.
        setCarLocation({ longitude: -2.238253, latitude: 53.47214 });
      }
    })();
  }, [userInfo]);

  let text = "Waiting...";
  if (userLocation) {
    text = JSON.stringify(userLocation);
  }

  const handleMapEvent = (event) => {
    setMapCenter(event.nativeEvent.data);
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={(r) => (webRef = r)}
        onMessage={handleMapEvent}
        style={styles.map}
        originWhitelist={["*"]}
        source={{
          html: MapTemplate(userLocation, carLocation, tracking, imgUri),
        }}
      />
      {/* Button to enable/disable navigation */}
      {carLocation.longitude !== undefined && (
        <Button
          title="Find My Car"
          color="#6C21DC"
          onPress={() => {
            setTracking(!tracking);
          }}
        />
      )}
      {/* ---------------------------------------- */}
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
