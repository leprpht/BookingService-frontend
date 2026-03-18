import { Component } from '@angular/core';
import { RecommendedList } from '../recommended-list/recommended-list';
import { FEATURED_CITIES } from '../../data/featured-cities';

@Component({
  selector: 'booking-service-home',
  imports: [RecommendedList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly cities = FEATURED_CITIES;
}
