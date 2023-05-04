import { useContext, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { UserInfoContext } from "../contexts/UserInfo";
import { addParking } from "../utils/parkings";

export default function ParkingInfo() {
  const { userInfo } = useContext(UserInfoContext);
  
  const parkObj = {
    uid: userInfo.uid,
    city: 'Manchester',
    latitude: 53.487311,
    longitude: -2.228192802761345,
    action: 1,
    duration: 60,
    reminder: 5,
    notes: "near the trees",
    pictureUrl: "https://insure2drive.co.uk/wp-content/uploads/2021/04/parked-car-shutterstock_573830026-copy.jpg"
  };

  useEffect(() => {
    console.log("creating parking object...");
    addParking(parkObj)
    .then((data) => {
      console.log('data', data);
    })
    .catch((error) => {
      console.log('error', error);
    });
  }, [])

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{userInfo?.uid}</Text>
      <Text>{userInfo?.username}</Text>
      <Text>{userInfo?.email}</Text>
      <Text>{userInfo?.activeParking ? "true" : "false"}</Text>
      <Text>{userInfo?.defaultParkDuration}</Text>
      <Text>{userInfo?.defaultReminder}</Text>
    </View>
  );
}
