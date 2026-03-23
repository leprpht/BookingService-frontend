import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SearchResults } from './components/search/search-results/search-results';
import { PropertyDetailsPage } from './components/property/property-details-page/property-details-page';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'search',
    component: SearchResults,
  },
  {
    path: 'property/:id',
    component: PropertyDetailsPage,
  },
];
