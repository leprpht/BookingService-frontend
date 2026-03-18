import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SearchResults } from './components/search-results/search-results';
import { PropertyDetailsPage } from './components/property-details/property-details-page';

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
