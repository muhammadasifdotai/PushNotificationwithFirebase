import { Alert } from "react-native";
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { registerToken } from "../api/apiService";


export const resquestPermission =async () => {
    await notifee.requestPermission()
    await notifee.setBadgeCount(0)
    await messaging().registerDeviceForRemoteMessages() // this is a paid service its needs apple developer accountsa and 99 dollars but for android its free.

    const token = await messaging().getToken()
    console.log(token)
    await registerToken(token)
}

// 1. get info on the device and the Power Manager settings
export const powerManagerCheck =async () => {
    const powerManagerInfo = await notifee.getPowerManagerInfo();
if (powerManagerInfo.activity) {
  // 2. ask your users to adjust their settings
  Alert.alert(
      'Restrictions Detected',
      'To ensure notifications are delivered, please adjust your settings to prevent the app from being killed',
      [
        // 3. launch intent to navigate the user to the appropriate screen
        {
          text: 'OK, open settings',
          onPress: async () => await notifee.openPowerManagerSettings(),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
      ],
      { cancelable: false }
    );
};
}

// 1. checks if battery optimization is enabled
export const batteryOptimizationCheck = async () => {
const batteryOptimizationEnabled = await notifee.isBatteryOptimizationEnabled();
if (batteryOptimizationEnabled) {
  // 2. ask your users to disable the feature
  Alert.alert(
      'Restrictions Detected',
      'To ensure notifications are delivered, please disable battery optimization for the app.',
      [
        // 3. launch intent to navigate the user to the appropriate screen
        {
          text: 'OK, open settings',
          onPress: async () => await notifee.openBatteryOptimizationSettings(),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
      ],
      { cancelable: false }
    );
};
}