import { createContext, useState } from "react";

export const UserInfoContext = createContext();

export function UserInfoProvider({ children }) {

  const [userInfo, setUserInfo] = useState(null);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
}