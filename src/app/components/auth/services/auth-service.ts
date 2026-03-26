import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = `${environment.apiUrl}/api/User/auth`;

interface AuthRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  login(email: string, password: string) {
    const request: AuthRequest = { email, password };
    return this.http.post<{ token: string }>(`${API_URL}/login`, request);
  }

  register(email: string, password: string) {
    const request: AuthRequest = { email, password };
    return this.http.post<{ token: string }>(`${API_URL}/register`, request);
  }
}
