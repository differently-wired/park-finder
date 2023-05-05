import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CustomButton = ({ title, onPress, style, titleStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const NavBar = () => {
  const navigation = useNavigation();
  return (
    <CustomButton
      title="+"
      style={styles.nav}
      titleStyle={styles.title}
      onPress={() => navigation.navigate("ParkedCarForm")}
    />
  );
};

export default NavBar;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    //increase bottom to move up above navbar
    bottom: 100,
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  title: {
    fontSize: 100,
    color: "black",
    lineHeight: 105,
  },
});
