import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowList: true,
    }),
});

export async function requestNotificationPermissions() {
    const { status } =
        await Notifications.requestPermissionsAsync();

    return status === "granted";
}

export async function clearNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function scheduleBinReminder(
    binType: string,
    collectionDate: Date
) {
    const reminderDate = new Date(collectionDate);

    reminderDate.setDate(reminderDate.getDate() - 1);
    reminderDate.setHours(19, 0, 0, 0);

    if (reminderDate <= new Date()) {
        return;
    }

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Bin Collection Tomorrow",
            body: `Put out your ${binType} bin tonight`,
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: reminderDate,
        },
    });
}
