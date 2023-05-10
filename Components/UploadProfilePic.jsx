import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


export default function UploadProfilePic({ onImageSelect }) {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            onImageSelect(result.assets[0].uri)
            
        }


    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Choose image"
                onPress={pickImage}
                style={{ backgroundColor: 'blue' }}
            />
            {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
        </View>
    );

}