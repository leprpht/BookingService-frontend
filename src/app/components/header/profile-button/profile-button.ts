import { Component, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { UserInfo } from '../../../models/types/userInfo';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth-service';

@Component({
  selector: 'booking-service-header-profile-button',
  imports: [MatButton, MatMenuModule, MatIcon],
  templateUrl: './profile-button.html',
  styleUrl: './profile-button.scss',
})
export class ProfileButton {
  readonly user = input.required<UserInfo>();

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  logout() {
    this.authService.logout();
  }
}
