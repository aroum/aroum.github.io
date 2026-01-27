import { DatasetConfig } from './types';

// INSTRUCTIONS:
// 1. Place your .csv files in a folder named 'data' in your public directory.
// 2. Add them to this list below.

export const APP_TITLE = "Custom Keyboard Database";
export const APP_DESCRIPTION = "Browse and analyze CSV-based data related to custom keyboards. Use search and filters to explore the dataset directly in your browser.";

export const DATASETS: DatasetConfig[] = [
  {
    id: "kailh-choc-mini",
    name: "Kailh Choc Mini (PG1232)",
    description: ".",
    filename: "kailh-choc-mini.csv",
    category: "Kailh",
  },
  {
    id: "kailh-choc-v1",
    name: "Kailh Choc V1 (PG1350)",
    description: "",
    filename: "kailh-choc-v1.csv",
    category: "Kailh",
  },
  {
    id: "kailh-choc-v2",
    name: "Kailh Choc V2 (PG1353)",
    description: ".",
    filename: "kailh-choc-v2.csv",
    category: "Kailh",
  },
  {
    id: "vedro",
    name: "My Colection of Swithes",
    description: "My Colection of Swithes",
    filename: "vedro.csv",
    category: "Swithes",
  },
  {
    id: "typewriter-keycaps",
    name: "typewriter-keycaps",
    description:
      "List of typewriters whose keycaps can be used in mechanical keyboards.",
    filename: "typewriter-keycaps.csv",
    category: "Inventory",
  },
  {
    id: "unusual-mx",
    name: "Unusual MX Switches",
    description:
      "A collection of unusual MX switches with unique characteristics.",
    filename: "unusual-mx.csv",
    category: "Literature",
  },
  {
    id: "hi-tek-725",
    name: "Hi-Tek Series 725 Switches",
    description:
      "Based on https://deskthority.net/wiki/Hi-Tek_Series_725 and https://wiki.vintkeys.ca/NMB/Switches",
    filename: "hi-tek-725.csv",
    category: "Education",
  },
];
