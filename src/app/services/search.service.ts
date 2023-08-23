import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  getMovieSearchResults(page = 1, query: string): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/search/movie?query=${query}&api_key=${environment.apiKey}&page=${page}`
    );
  }

  getTvShowsSearchResults(page = 1, query: string): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/search/tv?query=${query}&api_key=${environment.apiKey}&page=${page}`
    );
  }
}
