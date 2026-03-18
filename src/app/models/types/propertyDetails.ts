import { UnitListItem } from './unitListItem';

export interface PropertyDetails {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  description: string;
  averageRating: number;
  reviewCount: number;
  pictures: string[];
  units: UnitListItem[];
}

export interface PropertyDetailsData {
  getPropertyDetails: PropertyDetails;
}
