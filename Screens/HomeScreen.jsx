import { useContext } from "react";
import { Text, View } from "react-native";
import { UserInfoContext } from "../contexts/UserInfo";
import { FIREBASE_AUTH } from "../firebaseConfig";

export default function Homescreen() {
    console.log('FIREBASE_AUTH', FIREBASE_AUTH.currentUser);
    const { userInfo } = useContext(UserInfoContext);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold' }}>Hello</Text>
            <Text>{userInfo?.username}</Text>
            <Text>{userInfo?.email}</Text>
            <Text>{userInfo?.uid}</Text>
            <Text>{userInfo?.defaultParkTime}</Text>
            <Text>{userInfo?.defaultAlertBefore}</Text>
            <Text>{userInfo?.activeParking ? "true" : "false"}</Text>
        </View>
    );
}
