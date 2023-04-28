import { StatusBar } from "expo-status-bar";
import { Button, Button, StyleSheet, Text, View } from "react-native";
import { testPost } from "./utils/dbApi";
import { testPost } from "./utils/dbApi";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="test" onPress={testPost} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
