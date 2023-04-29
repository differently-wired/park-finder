import { Button, Text, View } from "react-native";
import { useGoogle, getUserInfo } from "../helpers/googleAuth";
import { useEffect, useState } from "react";

function SignIn() {
  const [user, setUser] = useState(null);
  const [request, token, promptAsyn] = useGoogle();

  useEffect(() => {
    if (!token) return;
    getUserInfo(token)
      .then((user) => {
        console.log('user', user);
        setUser(user)
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