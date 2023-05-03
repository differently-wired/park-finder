import * as ImagePicker from "expo-image-picker";

export const takePicture = async () => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.2,
  });
  return result;
};
