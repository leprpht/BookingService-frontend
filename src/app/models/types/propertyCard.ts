export interface PropertyCard {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  price: number;
  pictureUrl: string | null;
  rating: number;
  rankingScore: number;
  reviewCount: number;
  availableUnits: number;
  tags: string[];
}

export interface PropertiesData {
  topPropertiesByCity: PropertyCard[];
}
