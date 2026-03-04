import { PeriodRequest } from './periodRequest';

export interface HousingFilterOptions {
  period: PeriodRequest;
  searchQuery: string;
  city: string | null;
  country: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  tags: string[] | null;
  minRating: number | null;
  capacities: number[] | null;
}
