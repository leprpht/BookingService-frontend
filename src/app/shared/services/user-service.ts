import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../../models/types/userInfo';
import UserNameDto from '../../models/types/userNameDto';

const API_URL = `${environment.apiUrl}/api/User`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly http = inject(HttpClient);

  getUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${API_URL}`, { withCredentials: true });
  }

  updateName(name: UserNameDto): Observable<void> {
    return this.http.patch<void>(`${API_URL}/name`, name, { withCredentials: true });
  }
}
