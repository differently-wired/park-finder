import React, { useState, useEffect } from "react";
import { Button, View } from "react-native";
import TomTomMaps from "../Components/TomTomMaps";
import { UserInfoContext } from "../contexts/UserInfo";
import { useContext } from "react";
import { ParkingSessionModal } from "../Components/Modals/ParkingSessionModal";

// import NotificationSender from "../Components/NotificationSender";

export default function Homescreen() {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    if (userInfo.activeParking === true) {
      setModalVisible(true);
    }
  }, [userInfo]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {modalVisible ? (
        <ParkingSessionModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setUserInfo={setUserInfo}
          userInfo={userInfo}
        />
      ) : null}
      <TomTomMaps />
    </View>
  );
}
