import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";


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

// set up notifications
export const triggerNotifications = async (duration, reminder) => {
  const durationInSeconds = parseInt(duration) * 60;
  const reminderInSeconds = parseInt(reminder) * 60;
  let triggerTime = 2;
  if (durationInSeconds - reminderInSeconds > 0) {
    triggerTime = durationInSeconds - reminderInSeconds;
  }
  console.log(triggerTime);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Park Find & Remind",
      body: "It's time to return to your parking spot!",
      data: { data: "Parking is due to expire in 15 minutes" },
    },
    trigger: { seconds: triggerTime },
  });
}; 

