import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export const useGoogle = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "514293633890-5km39vif7kqhsgq9aoc9niiid8gsu08g.apps.googleusercontent.com",
    iosClientId: "514293633890-kbrks8g6f79recti12jnsh970957tkpn.apps.googleusercontent.com",
    expoClientId: "514293633890-qm6c45uin32i28r56ltmgheja4j311e6.apps.googleusercontent.com",
  })
  let token = null;
  if (response?.type === "success") {
    token = response.authentication.accessToken;
  }
  return [request, token, promptAsync];
}

export const getUserInfo = (token) => {
  return fetch("https://www.googleapis.com/userinfo/v2/me", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((body) => body.json());
}

