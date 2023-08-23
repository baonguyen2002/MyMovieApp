import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowseService } from 'src/app/services/browse.service';
import { environment } from 'src/environments/environment';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
@Component({
  selector: 'app-movie-browse-detail',
  templateUrl: './movie-browse-detail.page.html',
  styleUrls: ['./movie-browse-detail.page.scss'],
})
export class MovieBrowseDetailPage implements OnInit, ViewWillEnter {
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll!: IonInfiniteScroll;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private browseService: BrowseService
  ) {}
  movieStack: string[] = [];
  blankPoster: string =
    'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg';
  movieGenreName: string = '';
  genreId: string = '';
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
        this.genreId = queryParams.id;
      }
    } else {
      console.log('failed');
    }

    this.movieGenreName = this.route.snapshot.paramMap.get(
      'genreName'
    ) as string;

    this.loadMoviesWithGenre(this.genreId);
  }

  goToMovieDetails(movieId: string) {
    this.movieStack.unshift(movieId);
    const queryParams = {
      segment: `Genre/${this.movieGenreName}`,
      movieStack: this.movieStack,
    };

    this.router.navigateByUrl(`/tabs/movies/${movieId}`, {
      state: { queryParams },
    });
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

  page: number = 1;
  imageBaseUrl = environment.images;
  moviesList: any[] = [];
  async loadMoviesWithGenre(genre: string, event?: any) {
    this.browseService.getMoviesWithGenre(this.page, genre).subscribe((res) => {
      this.moviesList = [...this.moviesList, ...res.results];

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

  loadMore(event: any) {
    this.loadMoviesWithGenre(this.genreId, event);
  }
}
