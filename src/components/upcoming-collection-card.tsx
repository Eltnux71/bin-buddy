import type { Collection } from "../types/Collection";
import { getBinType } from "../utils/collections";
import { daysUntil, formatDate } from "../utils/dates";
import { StyleSheet, Text, View } from "react-native";

interface UpcomingCollectionCardProps {
  collection: Collection;
}

function getCollectionDayLabel(days: number): string {
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `${days} days remaining`;
}

export function UpcomingCollectionCard({
  collection,
}: UpcomingCollectionCardProps) {
  const binType = getBinType(collection.title);

  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{binType === "Recycling" ? "♻️" : "🗑️"}</Text>
      <Text style={styles.binType}>{binType}</Text>
      <Text style={styles.date}>{formatDate(collection.start)}</Text>
      <Text style={styles.days}>
        {getCollectionDayLabel(daysUntil(collection.start))}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  date: {
    color: "#FFFFFF",
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  days: {
    color: "#4CAF50",
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
  },
});
