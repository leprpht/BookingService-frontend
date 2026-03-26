import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SearchResults } from './components/search/results/search-results/search-results';
import { PropertyPage } from './components/property/property-page';
import { Login } from './components/auth/login/login';
import { Registration } from './components/auth/registration/registration';

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
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Registration,
  },
];
