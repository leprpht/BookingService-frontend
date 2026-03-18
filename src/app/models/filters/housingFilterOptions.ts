import {PeriodRequest} from '../requests/periodRequest';

export interface HousingFilterOptions {
  period: PeriodRequest;
  searchQuery: string | null;
  city: string | null;
  country: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  tags: string[] | null;
  minRating: number | null;
  capacities: number[] | null;
}
