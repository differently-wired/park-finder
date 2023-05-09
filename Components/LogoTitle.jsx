import { Image } from "react-native";

function LogoTitle() {
  return (
    <Image
      style={{ width: 300, height: 35 }}
      source={require("../assets/pfr-2-logo.png")}
    />
  );
}

export default LogoTitle;
