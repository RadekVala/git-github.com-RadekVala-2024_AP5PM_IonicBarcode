export interface ApiResponse {
  added_time: Date;
  modified_time: Date;
  title: string;
  alias: null;
  description: string;
  brand: string;
  manufacturer: null;
  msrp: null;
  ASIN: null;
  category: string;
  categories: string;
  stores: any[];
  barcode: string;
  success: boolean;
  timestamp: number;
  images: any[];
  metadata: Metadata | null;
  metanutrition: Metanutrition | null;
}

export interface Metadata {
  countries: string;
}

export interface Metanutrition {
  fat: string;
  fiber: string;
  energy: string;
  fat_100g: string;
  fat_unit: string;
  proteins: string;
  fat_value: string;
  fiber_100g: string;
  fiber_unit: string;
  "energy-kcal": string;
  energy_100g: string;
  energy_unit: string;
  fiber_value: string;
  sugars_unit: string;
  energy_value: string;
  carbohydrates: string;
  proteins_100g: string;
  proteins_unit: string;
  "saturated-fat": string;
  proteins_value: string;
  "energy-kcal_100g": string;
  "energy-kcal_unit": string;
  "energy-kcal_value": string;
  carbohydrates_100g: string;
  carbohydrates_unit: string;
  "saturated-fat_100g": string;
  "saturated-fat_unit": string;
  carbohydrates_value: string;
  "saturated-fat_value": string;
}
