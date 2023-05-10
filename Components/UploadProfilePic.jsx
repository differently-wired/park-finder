import React, { useState } from 'react';
import { Button, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
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

        if (!result.cancelled) {
            setImage(result.uri);
            onImageSelect(result.uri);
        }
    };

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Choose image</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
       marginTop:20,
    },
    button: {
        backgroundColor: '#6c21dc',
        borderRadius: 8,
        padding: 8,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});