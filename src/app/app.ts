import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';  
import { Header } from './components/header/header';
import { RecommendedList } from './components/recommended-list/recommended-list';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatButtonToggleModule,
    Header,
    RecommendedList
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('BookingService-frontend');
}
