import * as React from 'react';
import { View } from 'react-native';
import TomTomMaps from '../Components/TomTomMaps';


export default function Homescreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <TomTomMaps />
        </View>

    );
}