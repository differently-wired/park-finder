import * as ImagePicker from "expo-image-picker";

export const takePicture = async () => {
  try {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, // avoid cropping
      aspect: [4, 3],
      quality: 0.2,
    });
    return result;
  } catch (error) {
    console.log("takePicture Error:", error);
    return null;
  }
};

export function getCurrentDateTime() {
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date+' '+time;
}

