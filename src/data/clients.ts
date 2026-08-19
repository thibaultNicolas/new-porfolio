export const CLIENTS = [
  { id: "desjardins", name: "Desjardins" },
  { id: "inputkit", name: "InputKit" },
  { id: "imago", name: "Imago Communication" },
  { id: "lexya", name: "Lexya" },
  { id: "achete-ton-cell", name: "Achete ton cell" },
  { id: "hockey-academie", name: "Hockey Académie" },
  { id: "chaparral-ev", name: "Chaparral EV" },
  { id: "optimize-id", name: "Optimize ID" },
  { id: "mleau", name: "MLeau" },
  { id: "gamechanger", name: "Game Changer Hockey" },
  { id: "espace-beaute", name: "Espace Beauté CP" },
] as const;

export type ClientId = (typeof CLIENTS)[number]["id"];
