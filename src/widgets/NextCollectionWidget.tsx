"use no memo";

import { FlexWidget, TextWidget } from "react-native-android-widget";
import type { Collection } from "../types/Collection";
import { getBinType } from "../utils/collections";
import { daysUntil, formatShortDate } from "../utils/dates";

interface NextCollectionWidgetProps {
  collection: Collection | null;
  unavailable?: boolean;
}

export function NextCollectionWidget({
  collection,
  unavailable = false,
}: NextCollectionWidgetProps) {
  const binType = collection ? getBinType(collection.title) : null;
  const daysToCollection = collection ? daysUntil(collection.start) : null;
  const backgroundColor =
    binType === "Recycling"
      ? "#2E7D32"
      : binType === "Refuse"
        ? "#424242"
        : "#2D2D2D";

  const statusText =
    daysToCollection === null
      ? unavailable
        ? "Update failed"
        : "Schedule is clear"
      : daysToCollection === 0
        ? "Due today"
        : daysToCollection === 1
          ? "Due tomorrow"
          : `${daysToCollection} days away`;

  return (
    <FlexWidget
      clickAction="OPEN_APP"
      style={{
        width: "match_parent",
        height: "match_parent",
        padding: 16,
        borderRadius: 16,
        backgroundColor,
        justifyContent: "space-between",
      }}
    >
      <TextWidget
        text="BIN BUDDY"
        style={{
          color: "#FFFFFF",
          fontSize: 12,
          fontWeight: "bold",
        }}
      />
      <TextWidget
        text="NEXT COLLECTION"
        style={{
          color: "#FFFFFF",
          fontSize: 11,
          fontWeight: "bold",
        }}
      />
      <TextWidget
        text={binType ?? (unavailable ? "Unavailable" : "No collection")}
        maxLines={1}
        truncate="END"
        style={{
          color: "#FFFFFF",
          fontSize: 24,
          fontWeight: "bold",
        }}
      />
      {collection && (
        <TextWidget
          text={formatShortDate(collection.start)}
          maxLines={1}
          truncate="END"
          style={{
            color: "#FFFFFF",
            fontSize: 16,
          }}
        />
      )}
      <TextWidget
        text={statusText}
        style={{
          color: "#FFFFFF",
          fontSize: 13,
        }}
      />
    </FlexWidget>
  );
}
