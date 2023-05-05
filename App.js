import { NavigationContainer } from "@react-navigation/native";
import { UserInfoProvider } from "./contexts/UserInfo";
import AppNavigation from "./navigation/AppNavigation";

export default function App() {
  return (
    <UserInfoProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </UserInfoProvider>
  );
}
