import React, {useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidStyle} from '@notifee/react-native';

export default function App(): JSX.Element {
  // code for push notification with fcm token
  // // Get the device FCM token
  useEffect(() => {
    const getDeviceToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log('Device token:', token);
      } catch (error) {
        console.error('Error getting device token:', error);
      }
    };

    getDeviceToken();
  }, []);

  // Handle notification when the app is in the foreground
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      DisplayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  // code for push notification with notifee
  const DisplayNotification = async (data) => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Extract notification details
    const title = data?.notification?.title || data?.data?.title || 'Default Title';
    const body = data?.notification?.body || data?.data?.body || 'Default Body';

    // Display a notification
    await notifee.displayNotification({
      // title: 'Nature',
      // body: 'Background Images Nature Stock Photos, Images',
      title,
      body,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture:
            'https://static.vecteezy.com/system/resources/previews/036/226/872/non_2x/ai-generated-nature-landscapes-background-free-photo.jpg',
        },
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Alhamdulillah</Text>
      <TouchableOpacity style={styles.button} onPress={DisplayNotification}>
        <Text style={styles.text}>Display Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'green',
    fontSize: 27,
  },
  button: {
    width: '70%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
  },
});
