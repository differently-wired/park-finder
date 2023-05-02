import { useContext } from "react";
import { Text, View } from "react-native";
import { UserInfoContext } from "../contexts/UserInfo";

export default function Homescreen() {
    const { userInfo } = useContext(UserInfoContext);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold' }}>Hello</Text>
            <Text>{userInfo.displayName}</Text>
            <Text>{userInfo.email}</Text>
            <Text>{userInfo.uid}</Text>

        </View>
    );
}
