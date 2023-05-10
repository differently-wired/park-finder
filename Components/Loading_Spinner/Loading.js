import React from "react";
import { Text, View, StyleSheet, ActivityIndicator, Modal, Animated } from "react-native";

function LoadingScreen() {
    const spinValue = new Animated.Value(0);
    const colorValue = new Animated.Value(0);
    const [currentColor, setCurrentColor] = React.useState("#6C21DC");

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    React.useEffect(() => {
        const spinAnimation = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            })
        );

        const colorAnimation = Animated.loop(
            Animated.timing(colorValue, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: false,
            })
        );

        const timer = setInterval(() => {
            setCurrentColor(
                colorValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["#6C21DC", "#8B2CBF"], // Blue to purple colors
                })
            );
        }, 1500);

        spinAnimation.start();
        colorAnimation.start();

        return () => {
            spinAnimation.stop();
            colorAnimation.stop();
            clearInterval(timer);
        };
    }, []);

    return (
        <Modal transparent={true} animationType="none">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.loadingText}>Loading...</Text>
                    <View style={styles.spinnerContainer}>
                        <Animated.View
                            style={{
                                transform: [{ rotate: spin }],
                                backgroundColor: currentColor,
                                borderRadius: 8, // Rounded edges
                            }}
                        >
                            <ActivityIndicator color="white" size="large" />
                        </Animated.View>
                    </View>
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
    spinnerContainer: {
        marginTop: 16,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        fontSize: 24,
        marginBottom: 10,
    },
});

export default LoadingScreen;
