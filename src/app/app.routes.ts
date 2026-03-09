import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SearchResults } from './components/search-results/search-results';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'search',
    component: SearchResults
  }
];