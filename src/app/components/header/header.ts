import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SearchContainer } from '../search-container/search-container';

@Component({
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

}
