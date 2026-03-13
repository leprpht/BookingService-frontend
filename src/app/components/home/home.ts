import {Component} from '@angular/core';
import {RecommendedList} from '../recommended-list/recommended-list';

const FEATURED_CITIES = ['Paris', 'Barcelona', 'Tokyo', 'London', 'Rome', 'New York'];

@Component({
  selector: 'app-home',
  imports: [RecommendedList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly cities = FEATURED_CITIES;
}
