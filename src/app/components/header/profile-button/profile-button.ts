import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { UserInfo } from '../../../models/types/userInfo';

@Component({
  selector: 'booking-service-header-profile-button',
  imports: [MatButton],
  templateUrl: './profile-button.html',
  styleUrl: './profile-button.scss',
})
export class ProfileButton {
  readonly user = input.required<UserInfo>();
}
