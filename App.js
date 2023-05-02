import { NavigationContainer } from '@react-navigation/native';
import MyStack from './Routes/MyStack';
import { UserInfoProvider } from './contexts/UserInfo';

export default function App() {
  return (
    <UserInfoProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </UserInfoProvider>
  );
}
