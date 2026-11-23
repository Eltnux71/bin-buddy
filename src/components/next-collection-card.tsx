import type { Collection } from "../types/Collection";
import { getBinType } from "../utils/collections";
import { daysUntil, formatDate } from "../utils/dates";
import { StyleSheet, Text, View } from "react-native";

interface NextCollectionCardProps {
  collection: Collection;
}

function getNextCollectionMessage(days: number): string {
  if (days === 0) return "Put your bin out today";
  if (days === 1) return "Put your bin out tonight";
  return `${days} days remaining`;
}

export function NextCollectionCard({ collection }: NextCollectionCardProps) {
  const binType = getBinType(collection.title);
  const daysToCollection = daysUntil(collection.start);

  return (
    <View
      style={[
        styles.card,
        binType === "Recycling" ? styles.recycling : styles.refuse,
      ]}
    >
      <Text style={styles.sectionTitle}>NEXT COLLECTION</Text>

      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{binType === "Recycling" ? "♻️" : "🗑️"}</Text>
      </View>

      <Text style={styles.binType}>{binType}</Text>
      <Text style={styles.daysRemaining}>{daysToCollection} DAYS</Text>
      <Text style={styles.date}>{formatDate(collection.start)}</Text>
      <Text style={styles.message}>
        {getNextCollectionMessage(daysToCollection)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
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
  icon: {
    fontSize: 48,
  },
  binType: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  daysRemaining: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 10,
  },
  date: {
    color: "#FFFFFF",
    marginTop: 6,
    opacity: 0.9,
  },
  message: {
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
  recycling: {
    backgroundColor: "#2E7D32",
    shadowColor: "#4CAF50",
  },
  refuse: {
    backgroundColor: "#424242",
    shadowColor: "#757575",
  },
});
