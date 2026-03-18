import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from './components/header/header';

@Component({
  selector: 'booking-service-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

}
