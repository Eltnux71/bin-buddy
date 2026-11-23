import { getCollections } from "@/services/councilApi";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { NextCollectionCard } from "../components/next-collection-card";
import { UpcomingCollectionCard } from "../components/upcoming-collection-card";
import {
  clearNotifications,
  requestNotificationPermissions,
  scheduleBinReminder,
} from "../services/notifications";
import type { Collection } from "../types/Collection";
import { getBinType } from "../utils/collections";

export default function App() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const nextCollection = collections[0];
  const upcomingCollections = collections.slice(1);
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

      {nextCollection && <NextCollectionCard collection={nextCollection} />}

      <FlatList
        style={styles.collectionList}
        data={upcomingCollections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UpcomingCollectionCard collection={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#000000",
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
});
