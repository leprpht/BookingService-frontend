import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SearchResults } from './components/search/results/search-results/search-results';
import { PropertyPage } from './components/property/property-page';
import { UnitPage } from './components/unit/unit-page';

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
    component: PropertyPage,
  },
  {
    path: 'unit/:id',
    component: UnitPage,
  },
];
