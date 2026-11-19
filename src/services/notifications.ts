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
    const { status: currentStatus } =
        await Notifications.getPermissionsAsync();

    if (currentStatus === "granted") {
        return true;
    }

    const { status } = await Notifications.requestPermissionsAsync();

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
            title: `Tomorrow: ${binType} collection`,
            body: `Put your ${binType.toLowerCase()} bin out tonight.`,
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: reminderDate,
        },
    });
}
