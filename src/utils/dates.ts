export function formatDate(start: string): string {
  const match = start.match(/\d+/);

  if (!match) return "";

  const timestamp = Number(match[0]);

  return new Date(timestamp).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(start: string): string {
  const match = start.match(/\d+/);

  if (!match) return "";

  return new Date(Number(match[0])).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function daysUntil(start: string): number {
  const match = start.match(/\d+/);

  if (!match) return 0;

  const collectionDate = new Date(Number(match[0]));
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  collectionDate.setHours(0, 0, 0, 0);

  const diffTime = collectionDate.getTime() - today.getTime();

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
