import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { ViewWillEnter } from '@ionic/angular';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, ViewWillEnter {
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll!: IonInfiniteScroll;
  constructor(private searchService: SearchService, private router: Router) {}
  ionViewWillEnter(): void {
    this.movieStack = [];
  }
  ngOnInit() {
    // Access the navigation state
    const navigation = this.router.getCurrentNavigation();
    // Check if navigation and extras exist
    if (navigation && navigation.extras && navigation.extras.state) {
      const navigationState = navigation.extras.state;
      // Check if the state has queryParams
      if (navigationState['queryParams']) {
        // Extract the queryParams
        const { queryParams } = navigationState;
        // Retrieve the segment value and assign it to another variable
        this.segment = queryParams.segment;
      } else {
        this.segment = 'movie';
      }
    }
  }
  blankPoster: string =
    'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg';
  movieResults: any[] = [];
  tvShowsResults: any[] = [];
  imageBaseUrl: string = environment.images;
  page: number = 1;
  input: string = '';
  movieStack: string[] = [];
  async loadMoviesSearchResult(event?: any) {
    this.searchService
      .getMovieSearchResults(this.page, this.input)
      .subscribe((res) => {
        this.movieResults = [...this.movieResults, ...res.results];

        if (event) {
          event.target.complete();
        }
        if (this.page == res.total_pages) {
          this.infiniteScroll.disabled = true;
        } else {
          this.page++;
        }
      });
  }
  loadResults() {
    if (this.segment === 'movie') {
      this.loadMoviesSearchResult();
    } else {
      this.loadTvShowsSearchResult();
    }
  }
  async loadTvShowsSearchResult(event?: any) {
    this.searchService
      .getTvShowsSearchResults(this.page, this.input)
      .subscribe((res) => {
        this.tvShowsResults = [...this.tvShowsResults, ...res.results];

        if (event) {
          event.target.complete();
        }
        if (this.page == res.total_pages) {
          this.infiniteScroll.disabled = true;
        } else {
          this.page++;
        }
      });
  }
  resetSearch() {
    this.movieResults = [];
    this.tvShowsResults = [];
    this.input = '';
  }
  segment: string = 'movie';

  listView: boolean = true;
  gridView: boolean = false;
  listViewOn() {
    this.listView = true;
    this.gridView = false;
  }
  gridViewOn() {
    this.listView = false;
    this.gridView = true;
  }
  goToMovieDetails(movieId: string) {
    this.movieStack.unshift(movieId);

    const queryParams = {
      movieStack: this.movieStack,
      segment: this.segment,
    };

    this.router.navigateByUrl(`/tabs/movies/${movieId}`, {
      state: { queryParams },
    });
  }

  goToShowDetails(showId: string) {
    const queryParams = {
      segment: this.segment,
    };
    this.router.navigateByUrl(`/tabs/tvshows/${showId}`, {
      state: { queryParams },
    });
  }

  loadMore(event: any) {
    if (this.segment === 'movie') {
      this.loadMoviesSearchResult(event);
    } else {
      this.loadTvShowsSearchResult(event);
    }
  }
}
