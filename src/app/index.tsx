import { getCollections } from "@/services/councilApi";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import {
  clearNotifications,
  requestNotificationPermissions,
  scheduleBinReminder,
} from "../services/notifications";
import type { Collection } from "../types/Collection";
import { getBinType } from "../utils/collections";
import { daysUntil, formatDate } from "../utils/dates";

function getNextCollectionMessage(days: number): string {
  if (days === 0) return "Put your bin out today";
  if (days === 1) return "Put your bin out tonight";
  return `${days} days remaining`;
}

function getCollectionDayLabel(days: number): string {
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `${days} days remaining`;
}

export default function App() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const nextCollection = collections[0];
  const upcomingCollections = collections.slice(1);
  const nextCollectionType = nextCollection
    ? getBinType(nextCollection.title)
    : undefined;
  const nextCollectionDays = nextCollection
    ? daysUntil(nextCollection.start)
    : undefined;
  const loadCollections = useCallback(async () => {
    try {
      const data = await getCollections();

      await clearNotifications();

      for (const item of data) {
        const match = item.start.match(/\d+/);
        if (!match) continue;

        const collectionDate = new Date(Number(match[0]));
        await scheduleBinReminder(getBinType(item.title), collectionDate);
      }

      setCollections(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const initialiseApp = async () => {
      await requestNotificationPermissions();
      await loadCollections();
    };

    void initialiseApp();
  }, [loadCollections]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bin Buddy</Text>

      {nextCollection && (
        <View
          style={[
            styles.heroCard,
            nextCollectionType === "Recycling"
              ? styles.recyclingHero
              : styles.refuseHero,
          ]}
        >
          <Text style={styles.sectionTitle}>NEXT COLLECTION</Text>

          <View style={styles.iconContainer}>
            <Text style={styles.heroIcon}>
              {nextCollectionType === "Recycling" ? "♻️" : "🗑️"}
            </Text>
          </View>

          <Text style={styles.heroType}>{nextCollectionType}</Text>

          <Text style={styles.daysRemaining}>{nextCollectionDays} DAYS</Text>

          <Text style={styles.heroDate}>
            {formatDate(nextCollection.start)}
          </Text>

          <Text style={styles.heroMessage}>
            {getNextCollectionMessage(nextCollectionDays ?? 0)}
          </Text>
        </View>
      )}

      <FlatList
        style={styles.collectionList}
        data={upcomingCollections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const binType = getBinType(item.title);
          const daysUntilCollection = daysUntil(item.start);

          return (
            <View style={styles.card}>
              <Text style={styles.icon}>
                {binType === "Recycling" ? "♻️" : "🗑️"}
              </Text>
              <Text style={styles.binType}>{binType}</Text>
              <Text style={styles.dateText}>{formatDate(item.start)}</Text>
              <Text style={styles.daysText}>
                {getCollectionDayLabel(daysUntilCollection)}
              </Text>
            </View>
          );
        }}
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

  collectionList: {
    marginTop: 20,
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
