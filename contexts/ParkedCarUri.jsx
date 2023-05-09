import { createContext, useState } from "react";

export const ImageUriContext = createContext();

export function ImageUriProvider({ children }) {
  const [imageUri, setImageUri] = useState("hello");

  return (
    <ImageUriContext.Provider value={{ imageUri, setImageUri }}>
      {children}
    </ImageUriContext.Provider>
  );
}
