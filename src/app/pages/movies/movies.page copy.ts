import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit, ViewWillEnter {
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll!: IonInfiniteScroll;
  constructor(private moviesService: MoviesService, private router: Router) {}
  blankPoster: string =
    'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg';
  popularMovies: any[] = [];
  nowPlayingMovies: any[] = [];
  upcomingMovies: any[] = [];
  topRatedMovies: any[] = [];
  firstLoad: boolean = true;
  currentPage: any = {
    popular: 1,
    now_playing: 1,
    upcoming: 1,
    top_rated: 1,
  };

  movieStack: string[] = [];
  segment: string = '';
  imageBaseUrl = environment.images;
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
        this.firstLoad = false;
      }
    } else {
      this.headerTitle = 'Popular Movies';
      this.movieStack = [];
      this.segment = 'popular';
    }

    this.loadPopularMovies();
    this.loadNowPlayingrMovies();
    this.loadTopRatedMovies();
    this.loadUpcomingMovies();
  }

  async loadPopularMovies(event?: any) {
    this.moviesService
      .getPopularMovies(this.currentPage.popular)
      .subscribe((res) => {
        this.popularMovies = [...this.popularMovies, ...res.results];

        if (event) {
          event.target.complete();
        }

        if (this.currentPage.popular === res.total_pages) {
          this.infiniteScroll.disabled = true;
        } else {
          this.currentPage.popular++;
        }
      });
  }

  async loadUpcomingMovies(event?: any) {
    this.moviesService
      .getUpcomingMovies(this.currentPage.upcoming)
      .subscribe((res) => {
        this.upcomingMovies = [...this.upcomingMovies, ...res.results];

        if (event) {
          event.target.complete();
        }

        if (this.currentPage.upcoming === res.total_pages) {
          this.infiniteScroll.disabled = true;
        } else {
          this.currentPage.upcoming++;
        }
      });
  }

  async loadTopRatedMovies(event?: any) {
    this.moviesService
      .getTopRatedMovies(this.currentPage.top_rated)
      .subscribe((res) => {
        this.topRatedMovies = [...this.topRatedMovies, ...res.results];

        if (event) {
          event.target.complete();
        }

        if (this.currentPage.top_rated === res.total_pages) {
          this.infiniteScroll.disabled = true;
        } else {
          this.currentPage.top_rated++;
        }
      });
  }

  async loadNowPlayingrMovies(event?: any) {
    this.moviesService
      .getNowPlayingMovies(this.currentPage.now_playing)
      .subscribe((res) => {
        this.nowPlayingMovies = [...this.nowPlayingMovies, ...res.results];

        if (event) {
          event.target.complete();
        }

        if (this.currentPage.now_playing === res.total_pages) {
          this.infiniteScroll.disabled = true;
        } else {
          this.currentPage.now_playing++;
        }
      });
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
  headerTitle: string = '';

  onSegmentChanged() {
    if (!this.firstLoad) {
      const state = history.state;
      state.queryParams.segment = this.segment; // Replace 'new value' with your desired new value for segment
      history.replaceState(state, '');
    }

    if (this.segment === 'popular') {
      this.headerTitle = 'Popular Movies';
    }
    if (this.segment === 'now_playing') {
      this.headerTitle = 'Now Playing Movies';
    }
    if (this.segment === 'top_rated') {
      this.headerTitle = 'Top Rated Movies';
    }
    if (this.segment === 'upcoming') {
      this.headerTitle = 'Upcoming Movies';
    }
  }

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

  loadMore(event: any, type: string) {
    if (type === 'popular') {
      this.loadPopularMovies(event);
    }
    if (type === 'now_playing') {
      this.loadNowPlayingrMovies(event);
    }
    if (type === 'upcoming') {
      this.loadUpcomingMovies(event);
    }
    if (type === 'top_rated') {
      this.loadTopRatedMovies(event);
    }
  }
}
