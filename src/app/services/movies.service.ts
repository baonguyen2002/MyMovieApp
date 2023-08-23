import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getPopularMovies(page = 1): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`
    );
  }

  getNowPlayingMovies(page = 1): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/movie/now_playing?api_key=${environment.apiKey}&page=${page}`
    );
  }

  getTopRatedMovies(page = 1): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/movie/top_rated?api_key=${environment.apiKey}&page=${page}`
    );
  }

  getUpcomingMovies(page = 1): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/movie/upcoming?api_key=${environment.apiKey}&page=${page}`
    );
  }

  getMovieDetails(id: string): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`
    );
  }

  getMovieCredits(id: string): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/movie/${id}/credits?api_key=${environment.apiKey}`
    );
  }

  getCastDetail(id: string): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/person/${id}?api_key=${environment.apiKey}`
    );
  }

  getRecommendedMovies(id: string): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/movie/${id}/recommendations?api_key=${environment.apiKey}`
    );
  }
}
