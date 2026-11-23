import type { Collection } from "@/types/Collection";

export async function getCollections(): Promise<Collection[]> {
  const today = new Date();

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);

  const fromDate = today.toISOString().split("T")[0];

  const toDate = endDate.toISOString().split("T")[0];

  const response = await fetch(
    `https://cms.northnorthants.gov.uk/bin-collection-search/calendarevents/100031038143/${fromDate}/${toDate}`
  );

  if (!response.ok) {
    throw new Error(`Failed to load collections: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("The council API returned an invalid collection list.");
  }

  const collections = data.filter(isCollection);

  if (collections.length !== data.length) {
    throw new Error("The council API returned an invalid collection list.");
  }

  return collections;
}

function isCollection(value: unknown): value is Collection {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "number" &&
    "title" in value &&
    typeof value.title === "string" &&
    "start" in value &&
    typeof value.start === "string"
  );
}
