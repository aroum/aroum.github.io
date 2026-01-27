export interface DatasetConfig {
  id: string;
  name: string;
  description: string;
  filename: string; // The path relative to the public/data folder
  category?: string;
}

export interface CsvData {
  headers: string[];
  rows: Record<string, any>[];
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  key: string;
  direction: SortDirection;
}
