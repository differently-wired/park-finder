import { Button, Text, View } from "react-native";
import { useGoogle, getUserInfo } from "../helpers/googleAuth";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserInfoContext } from "../contexts/UserInfo";

function SignIn() {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [user, setUser] = useState(null);
  const [request, token, promptAsyn] = useGoogle();
  const navigation = useNavigation();

  useEffect(() => {
    token &&
    getUserInfo(token)
      .then((user) => {
        console.log('user', user);
        setUser(user)
        
        setUserInfo({
          uid: user.id,
          email: user.email,
          family_name: user.family_name,
          given_name: user.given_name,
          name: user.name,
          locale: user.locale,
          picture: user.picture,
        });
        navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        console.log('error', error);
        alert('Sign In Failed!');
      })
  }, [token]);

  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center",}}>
      <Text>Welcome</Text>
      <Text></Text>
      <Text>{user?.given_name}</Text>
      <Text></Text>
      <Button 
        title="Connect with Google"           
        disabled={!request}
        onPress={() => promptAsyn()} 
      />
    </View>
  );
}

export default SignIn;