import {Component, inject} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {SearchContainer} from '../search-container/search-container';
import {Router} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    SearchContainer
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);

  goHome() {
    this.router.navigate(['/']);
  }
}
