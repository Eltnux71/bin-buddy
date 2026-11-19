import { getCollections } from "@/services/councilApi";
import type { Collection } from "@/types/Collection";
import type { WidgetTaskHandlerProps } from "react-native-android-widget";
import { NextCollectionWidget } from "./NextCollectionWidget";

export async function widgetTaskHandler({
  widgetAction,
  renderWidget,
}: WidgetTaskHandlerProps): Promise<void> {
  if (
    widgetAction !== "WIDGET_ADDED" &&
    widgetAction !== "WIDGET_UPDATE" &&
    widgetAction !== "WIDGET_RESIZED"
  ) {
    return;
  }

  let collection: Collection | null;

  try {
    const collections = await getCollections();
    collection = collections[0] ?? null;
  } catch (error) {
    console.error("Failed to update the home-screen widget:", error);
    renderWidget(<NextCollectionWidget collection={null} unavailable />);
    return;
  }

  renderWidget(<NextCollectionWidget collection={collection} />);
}
