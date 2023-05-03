import { useContext } from "react";
import { Text, View } from "react-native";
import { UserInfoContext } from "../contexts/UserInfo";
import TomTomMaps from '../Components/TomTomMaps';

export default function Homescreen() {
    const { userInfo } = useContext(UserInfoContext);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <TomTomMaps />
        </View>
    );
}
