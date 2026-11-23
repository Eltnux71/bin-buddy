export type BinType = "Recycling" | "Refuse";

export function getBinType(title: string): BinType {
  return title.includes("Recycling") ? "Recycling" : "Refuse";
}
