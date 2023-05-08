
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const HomeIcon = ({ color, size }) => (
    <MaterialCommunityIcons name="home-outline" color={color} size={size} />
);

export const CameraIcon = ({ color, size }) => (
    <Ionicons name="camera-outline" color={color} size={size} />
);

export const ProfileIcon = ({ color, size }) => (
    <Ionicons name="person-outline" color={color} size={size} />
);
