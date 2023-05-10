import React from "react";
import { Text, View, StyleSheet, ActivityIndicator, Modal, Animated } from "react-native";

function LoadingScreen() {
    const spinValue = new Animated.Value(0);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    React.useEffect(() => {
  
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    return (
        <Modal transparent={true} animationType="none">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Animated.View style={{ transform: [{ rotate: spin }] }}>
                        <ActivityIndicator color="#6C21DC" size="large" />
                    </Animated.View>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    loadingText: {
        fontSize: 18,
        marginTop: 10,
    },
});

export default LoadingScreen;
