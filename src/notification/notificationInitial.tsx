import notifee, { AndroidStyle } from '@notifee/react-native';

export const addBadgeCount = async () => {
    notifee.setBadgeCount(1).then(() => console.log('Bage Count'))
}

// This function is created for the display notification we can reused for this anywhere we want to show notification
export const displayNotification = async (
    tittle: string,
    message: string,
    image: string,
    categoryId: string,
) => {

    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: 'notification'
    })

    await notifee.displayNotification({
        title: tittle,
        body: message,
        android: {
            channelId: channelId,
            sound: 'notification',
            onlyAlertOnce: true,
            smallIcon: 'ic_stat_name',
            style: {
                type: AndroidStyle.BIGPICTURE,
                picture: image || require('../assets/images/launch.png')
            },
            actions: [
                {
                    title: 'Okay',
                    pressAction: {
                        id: categoryId,
                        launchActivity: 'default'
                    }
                }
            ]
        },
        ios: {
            categoryId: categoryId,
            attachments: [
                {
                    url: image || require('../assets/images/launch.png'),
                    thumbnailHidden: false,
                },
            ],
            foregroundPresentationOptions: {
                badge: true,
                sound: true,
                banner: true,
                list: true,
            },
            sound: 'notification.wav'
        }
    })
}


// Here we define the categoray of notification 
export const setCategories = async () => {
    await notifee.setNotificationCategories([
        // 1. Category
        {
            id: 'water-intake',
            actions: [
                {
                    id: 'water-intake',
                    title: 'Okay',
                    foreground: true,
                }
            ]
        },
        // 2. Category
        {
            id: 'drink-action',
            actions: [
                {
                    id: 'drink-action',
                    title: 'I Drink Water',
                    foreground: true,
                }
            ]
        },
    ])
}