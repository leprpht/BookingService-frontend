import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const LOCATION_API_URL = `${environment.apiUrl}/api/location`;

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private http: HttpClient = inject(HttpClient);

  autocomplete(query: string, maxResults = 5): Observable<string[]> {
    if (!query.trim()) {
      return new Observable((observer) => {
        observer.next([]);
        observer.complete();
      });
    }

    if (maxResults < 1 || maxResults > 20) {
      maxResults = 5;
    }

    if (query.length > 30) {
      query = query.slice(0, 30);
    }

    const params = new HttpParams().set('query', query).set('maxResults', maxResults.toString());

    return this.http
      .get<{ suggestions: string[] }>(`${LOCATION_API_URL}/autocomplete`, { params })
      .pipe(
        map((data) => {
          console.log('raw response:', data);
          return data.suggestions;
        }),
      );
  }
}
