// In whcih we will create the basically reminder for water intake in this example (means in which we create reminder)

import notifee, {
  AndroidAction,
  AndroidImportance,
  AndroidStyle,
  IntervalTrigger,
  RepeatFrequency,
  TimestampTrigger,
  TimeUnit,
  TriggerType,
} from '@notifee/react-native';


// This will not be used, it is for interval.
export const createIntervalNotification = async (
    imageUri: string,
    title: string,
    body: string,
    intervalTime: number, //Interval:  how after the time you want be played.
    timeUnit: TimeUnit,
  ) => {
  
    const trigger: IntervalTrigger = {
      type: TriggerType.INTERVAL, // TIMESTAMP: triger on particular time.
      interval: intervalTime,
      timeUnit: timeUnit,
    };
  
    // below action: when you click on the notification it will launch the  application
    const action: AndroidAction = {
      title: 'View Details',
      pressAction: {
        id: 'View Details',
        launchActivity: 'default',
      },
    };
  
    // now tigering the notification
  
    await notifee.createTriggerNotification(
      {
        title,
        body,
        android: {
          channelId: 'default',
          sound: 'notification',
          onlyAlertOnce: true,
          smallIcon: 'ic_stat_name',
          style: {
            type: AndroidStyle.BIGPICTURE,
            picture: imageUri || require('../assets/images/launch.png'),
          },
          importance: AndroidImportance.HIGH,
        },
        ios: {
          categoryId: 'default',
          attachments: [
            {
              url: imageUri || require('../assets/images/launch.png'),
              thumbnailHidden: false,
            },
          ],
          interruptionLevel: 'timeSensitive',
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
          sound: 'notification.wav',
        },
      },
      trigger,
    );
  };



export const createTimeStampNotification = async (
  imageUri: string,
  title: string,
  body: string,
  hour: number,
  minute: number,
  notificationID: string,
) => {
  const now = new Date();
  const triggerDate = new Date();

  triggerDate.setHours(hour, minute, 0, 0);

  if (triggerDate <= now) {
    triggerDate.setDate(triggerDate.getDate() + 1);
  }

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP, // TIMESTAMP: triger on particular time.
    timestamp: triggerDate.getTime(),
    repeatFrequency: RepeatFrequency.DAILY, // it have many options hour, daily, week etc
    alarmManager: true,
  };

  // below action: when you click on the notification it will launch the  application
  const action: AndroidAction = {
    title: 'View Details',
    pressAction: {
      id: 'View Details',
      launchActivity: 'default',
    },
  };

  // now tigering the notification

  await notifee.createTriggerNotification(
    {
      id: notificationID,
      title,
      body,
      android: {
        channelId: 'default',
        sound: 'notification',
        onlyAlertOnce: true,
        smallIcon: 'ic_stat_name',
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture: imageUri || require('../assets/images/launch.png'),
        },
        actions: [action],
      },
      ios: {
        categoryId: 'default',
        attachments: [
          {
            url: imageUri || require('../assets/images/launch.png'),
            thumbnailHidden: false,
          },
        ],
        interruptionLevel: 'timeSensitive',
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
        sound: 'notification.wav',
      },
    },
    trigger,
  );
};
