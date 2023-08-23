import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TvShowsService {
  constructor(private http: HttpClient) {}

  getTopRatedTvShows(page = 1): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/tv/top_rated?api_key=${environment.apiKey}&page=${page}`
    );
  }

  getAiringTodayShows(page = 1): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/tv/airing_today?api_key=${environment.apiKey}&page=${page}`
    );
  }

  getOnTheAirShows(page = 1): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/tv/on_the_air?api_key=${environment.apiKey}&page=${page}`
    );
  }

  getPopularShows(page = 1): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/tv/popular?api_key=${environment.apiKey}&page=${page}`
    );
  }

  getShowDetails(id: string): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/tv/${id}?api_key=${environment.apiKey}`
    );
  }
}
