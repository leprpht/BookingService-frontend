import { Component, input } from '@angular/core';

@Component({
  selector: 'booking-service-auth-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  title = input.required<string>();
}
