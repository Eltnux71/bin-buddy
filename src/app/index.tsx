import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  clearNotifications,
  requestNotificationPermissions,
  scheduleBinReminder,
} from "../services/notifications";

export default function App() {
  const [collections, setCollections] = useState<any[]>([]);
  const nextCollection = collections[0];
  const upcomingCollections = collections.slice(1);
  const isNextRecycling = nextCollection?.title.includes("Recycling");
  const initialiseApp = async () => {
    const granted =
      await requestNotificationPermissions();

    if (granted) {
      await testNotification();
    }

    await loadCollections();
  };

  const testNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Bin Buddy Test",
        body: "Notifications are working!",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 10,
      },
    });
  };

  useEffect(() => {
    initialiseApp();
  }, []);

  const loadCollections = async () => {
    try {
      const today = new Date();

      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 30);

      const fromDate = today.toISOString().split("T")[0];
      const toDate = endDate.toISOString().split("T")[0];

      const response = await fetch(
        `https://cms.northnorthants.gov.uk/bin-collection-search/calendarevents/100031038143/${fromDate}/${toDate}`
      );

      const text = await response.text();

      const data = JSON.parse(text);
      await clearNotifications();

      for (const item of data) {
        const match = item.start.match(/\d+/);

        if (!match) continue;

        const collectionDate =
          new Date(Number(match[0]));

        const binType =
          item.title.includes("Recycling")
            ? "Recycling"
            : "Refuse";

        await scheduleBinReminder(
          binType,
          collectionDate
        );
      }

      setCollections(data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (start: string) => {
    const match = start.match(/\d+/);

    if (!match) return "";

    const timestamp = Number(match[0]);

    return new Date(timestamp).toLocaleDateString(
      "en-GB",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  const daysUntil = (start: string) => {
    const match = start.match(/\d+/);

    if (!match) return 0;

    const collectionDate = new Date(Number(match[0]));
    const today = new Date();

    // Reset times so we're comparing days only
    today.setHours(0, 0, 0, 0);
    collectionDate.setHours(0, 0, 0, 0);

    const diffTime =
      collectionDate.getTime() - today.getTime();

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bin Buddy</Text>

      {nextCollection && (
        <View
          style={[
            styles.heroCard,
            isNextRecycling
              ? styles.recyclingHero
              : styles.refuseHero,
          ]}
        >
          <Text style={styles.sectionTitle}>
            NEXT COLLECTION
          </Text>

          <View style={styles.iconContainer}>
            <Text style={styles.heroIcon}>
              {isNextRecycling ? "♻️" : "🗑️"}
            </Text>
          </View>

          <Text style={styles.heroType}>
            {nextCollection.title.includes("Recycling")
              ? "Recycling"
              : "Refuse"}
          </Text>

          <Text style={styles.daysRemaining}>
            {daysUntil(nextCollection.start)} DAYS
          </Text>

          <Text style={styles.heroDate}>
            {formatDate(nextCollection.start)}
          </Text>

          <Text style={styles.heroMessage}>
            {daysUntil(nextCollection.start) === 0
              ? "Put your bin out today"
              : daysUntil(nextCollection.start) === 1
                ? "Put your bin out tonight"
                : `${daysUntil(nextCollection.start)} days remaining`}
          </Text>
        </View>
      )}

      <FlatList
        style={{ marginTop: 20 }}
        data={upcomingCollections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.icon}>
              {item.title.includes("Recycling")
                ? "♻️"
                : "🗑️"}
            </Text>

            <Text style={styles.binType}>
              {item.title.includes("Recycling")
                ? "Recycling"
                : "Refuse"}
            </Text>

            <Text style={styles.dateText}>
              {formatDate(item.start)}
            </Text>

            <Text style={styles.daysText}>
              {
                daysUntil(item.start) === 0
                  ? "Today"
                  : daysUntil(item.start) === 1
                    ? "Tomorrow"
                    : `${daysUntil(item.start)} days remaining`
              }
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#121212",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffff",
  },

  card: {
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#2D2D2D",
    borderRadius: 8,
    backgroundColor: "#1E1E1E",
  },

  binType: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#ffffff",
  },

  dateText: {
    color: "#FFFFFF",
  },

  icon: {
    fontSize: 24,
    marginBottom: 8,
  },

  heroCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 15,
    alignItems: "center",

    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.66)",

    elevation: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  sectionTitle: {
    color: "#FFFFFF",
    opacity: 0.8,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 10,
  },

  heroIcon: {
    fontSize: 48,
  },

  heroType: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },

  heroDate: {
    color: "#FFFFFF",
    marginTop: 6,
    opacity: 0.9,
  },

  daysRemaining: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 10,
  },

  daysText: {
    color: "#4CAF50",
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
  },

  recyclingHero: {
    backgroundColor: "#2E7D32",
    shadowColor: "#4CAF50",
  },

  refuseHero: {
    backgroundColor: "#424242",
    shadowColor: "#757575",
  },

  heroMessage: {
    color: "#FFFFFF",
    opacity: 0.9,
    marginTop: 8,
  },

  iconContainer: {
    width: 75,
    height: 75,
    borderRadius: 35,

    backgroundColor: "rgba(255,255,255,0.95)",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 4,
  },
});