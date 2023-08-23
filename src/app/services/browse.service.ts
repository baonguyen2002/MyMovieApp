import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  constructor(private http: HttpClient) {}

  getMoviesGenresList(): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/genre/movie/list?api_key=${environment.apiKey}`
    );
  }

  getTvShowsGenresList(): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/genre/tv/list?api_key=${environment.apiKey}`
    );
  }

  getMoviesWithGenre(page = 1, genre: string): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/discover/movie?api_key=${environment.apiKey}&with_genres=${genre}&page=${page}`
    );
  }

  geShowsWithGenre(page = 1, genre: string): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/discover/tv?api_key=${environment.apiKey}&with_genres=${genre}&page=${page}`
    );
  }
}
