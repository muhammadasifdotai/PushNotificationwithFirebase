import { createTimeStampNotification } from "./notificationUtils";
import notifee from '@notifee/react-native';

const INTERVAL_NOTIFICATION_ID = 'water-reminder';

const createHourlyReminders = async () => {
    const startHour = 9;
    const endHour = 23;
    const interval = 2;
    let counter = 1;
    for (let hour = startHour; hour <= endHour; hour += interval) {
        await createTimeStampNotification(
            require('../assets/images/water.png'),
            'Water Reminder',
            'Time to drink water keep up the good work',
            hour,
            0,
            `${INTERVAL_NOTIFICATION_ID}-${counter}`
        )
        counter++;
    }
}

// we will call this in App.tsx
export const registeringAllTriggers = async () => {
    const {waterDrinkStamps, resetWaterIntake} = useWaterStore.gestState()
    const {initializeStepsForTheDay} = usePedometerStore.getState()

    // GOOD MORNING
    createTimeStampNotification(
        require('../assets/images/gm.png'),
        'Good Morning! ',
        'Start your day with positivity !',
        6,
        0, 
        'good-morning'
    )


    // GOOD NIGHT
    createTimeStampNotification(
        require('../assets/images/gn.png'),
        'Good Night! ',
        'End your day with peace and relaxation !',
        22,
        0, 
        'good-night'
    )

    // WALKING REMINDER-MORNING WALK
    createTimeStampNotification(
        require('../assets/images/run.png'),
        'Healthy Walking ',
        'Take a step today towards a healthier you!',
        7,
        0, 
        'daily-walking-morning'
    )


    // WALKING REMINDER-EVENING WALK
    createTimeStampNotification(
        require('../assets/images/run.png'),
        'Healthy Walking ',
        'Take a step today towards a healthier you!',
        18,
        0, 
        'daily-walking-morning'
    )

    // WATER REMINDERS 

    if (waterDrinkStamps.length != 8) {
        await createHourlyReminders()
    } else {
        const notifications = await notifee.getTriggerNotifications()
        let counter = 1;
        for (const notification of notifications) {
            if (notification.notification.id === `${INTERVAL_NOTIFICATION_ID}-${counter}`) {
                await notifee.cancelNotification(notification.notification.id)
            }
            counter++;
        }
    }

    // RESET WATER INTAKE EVERY DAY WHEN APP OPENS 
    const now = new Date()
    const currentDate = now.toISOString().split('T') [0];
    const isFromPreviousDay = (timestamps: string[]) => {
        if (timestamps.length === 0) return true;
        const lastTimeStamp = new Date(timestamps[timestamps.length - 1])
        const lastDate = lastTimeStamp.toISOString().split('T') [0]
        return lastDate !== currentDate
    }

    if(isFromPreviousDay(waterDrinkStamps)) {
        resetWaterIntake()
    }

}