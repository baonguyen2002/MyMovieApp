import { Component, OnInit, ViewChild } from '@angular/core';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { environment } from 'src/environments/environment';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.page.html',
  styleUrls: ['./tvshows.page.scss'],
})
export class TvshowsPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll!: IonInfiniteScroll;
  imageBaseUrl = environment.images;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tvService: TvShowsService
  ) {}
  goToTVShowDetails(tvShowId: string) {
    const queryParams = { segment: `${this.segment}` };

    this.router.navigateByUrl(`/tabs/tvshows/${tvShowId}`, {
      state: { queryParams },
    });
  }
  firstLoad: boolean = true;
  topRatedShows: any[] = [];
  airingTodayShows: any[] = [];
  onTheAirShows: any[] = [];
  popularShows: any[] = [];
  segment: string = '';
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
      }
    } else {
      this.segment = 'top_rated';
    }

    this.loadTopRatedShows();
    this.loadAiringTodayShows();
    this.loadPopularShows();
    this.loadOnTheAirShows();
  }
  blankPoster: string =
    'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg';
  currentPage: any = {
    popular: 1,
    top_rated: 1,
    airing_today: 1,
    on_the_air: 1,
  };

  async loadTopRatedShows(event?: any) {
    this.tvService
      .getTopRatedTvShows(this.currentPage.top_rated)
      .subscribe((res) => {
        this.topRatedShows = [...this.topRatedShows, ...res.results];

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

  async loadAiringTodayShows(event?: any) {
    this.tvService
      .getAiringTodayShows(this.currentPage.airing_today)
      .subscribe((res) => {
        this.airingTodayShows = [...this.airingTodayShows, ...res.results];

        if (event) {
          event.target.complete();
        }

        if (this.currentPage.airing_today === res.total_pages) {
          this.infiniteScroll.disabled = true;
        } else {
          this.currentPage.airing_today++;
        }
      });
  }

  async loadOnTheAirShows(event?: any) {
    this.tvService
      .getOnTheAirShows(this.currentPage.on_the_air)
      .subscribe((res) => {
        this.onTheAirShows = [...this.onTheAirShows, ...res.results];

        if (event) {
          event.target.complete();
        }

        if (this.currentPage.on_the_air === res.total_pages) {
          this.infiniteScroll.disabled = true;
        } else {
          this.currentPage.on_the_air++;
        }
      });
  }

  async loadPopularShows(event?: any) {
    this.tvService
      .getPopularShows(this.currentPage.popular)
      .subscribe((res) => {
        this.popularShows = [...this.popularShows, ...res.results];

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

  onSegmentChanged() {
    if (!this.firstLoad) {
      const state = history.state;
      state.queryParams.segment = this.segment; // Replace 'new value' with your desired new value for segment
      history.replaceState(state, '');
    }
  }
  loadMore(event: any, type: string) {
    if (type === 'top_rated') {
      this.loadTopRatedShows(event);
    }
    if (type === 'airing_today') {
      this.loadAiringTodayShows(event);
    }
    if (type === 'on_the_air') {
      this.loadOnTheAirShows(event);
    }
    if (type === 'popular') {
      this.loadPopularShows(event);
    }
  }
}
