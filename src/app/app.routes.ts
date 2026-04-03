import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SearchResults } from './components/search/results/search-results/search-results';
import { PropertyPage } from './components/property/property-page';
import { ProfileSetup } from './components/profile-setup/profile-setup';
import { nameSetupGuard, alreadySetupGuard } from './guards';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    canActivate: [nameSetupGuard],
  },
  {
    path: 'search',
    component: SearchResults,
    canActivate: [nameSetupGuard],
  },
  {
    path: 'property/:id',
    component: PropertyPage,
    canActivate: [nameSetupGuard],
  },
  {
    path: 'profile-setup',
    component: ProfileSetup,
    canActivate: [alreadySetupGuard],
  },
];
