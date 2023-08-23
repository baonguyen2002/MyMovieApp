import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import iso6391 from 'iso-639-1';
@Component({
  selector: 'app-movies-detail',
  templateUrl: './movies-detail.page.html',
  styleUrls: ['./movies-detail.page.scss'],
})
export class MoviesDetailPage implements OnInit {
  movie: any = {};

  movieId: any;
  recommendedMoviesList: any[] = [];
  creditList: any[] = [];
  movieStack: string[] = [];
  imageBaseUrl = environment.images;
  blankAvatar: string =
    'https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg';
  blankPoster: string =
    'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg';
  defaultHref: string = '/tabs';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieService: MoviesService
  ) {}

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
        this.movieStack = queryParams.movieStack;
      }
    }

    this.movieId = this.route.snapshot.paramMap.get('id') as string;
    this.movieService.getMovieDetails(this.movieId).subscribe((res) => {
      this.movie = res;
      this.originalLanguageCode = this.movie.original_language;
      this.fullLanguageName = iso6391.getName(this.originalLanguageCode);
    });

    this.movieService.getMovieCredits(this.movieId).subscribe((res) => {
      this.creditList = res.cast;
    });

    this.movieService.getRecommendedMovies(this.movieId).subscribe((res) => {
      this.recommendedMoviesList = res.results;
    });
  }
  originalLanguageCode: string = '';

  fullLanguageName: string = '';

  goToPersonDetails(movieId: string, personId: string) {
    const queryParams = { segment: `${this.segment}` };

    this.router.navigateByUrl(`/tabs/movies/${movieId}/cast/${personId}`, {
      state: { queryParams },
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

  segment: string = '';

  goBack() {
    if (this.segment.includes('Genre')) {
      if (this.movieStack.length > 1) {
        const prevMovie = this.movieStack[1];
        this.movieStack.shift();
        this.defaultHref = `${this.defaultHref}/movies/${prevMovie}`;
        const queryParams = {
          segment: this.segment,
          movieStack: this.movieStack,
        };

        this.router.navigateByUrl(this.defaultHref, {
          state: { queryParams },
        });
      } else {
        const genre = this.segment.split('/')[1];
        const queryParams = {
          segment: this.segment,
        };

        this.defaultHref = `${this.defaultHref}/browse/moviegenre/${genre}`;
        this.router.navigateByUrl(this.defaultHref, {
          state: { queryParams },
        });
      }
    } else if (this.segment === 'movie') {
      if (this.movieStack.length > 1) {
        const prevMovie = this.movieStack[1];
        this.movieStack.shift();
        this.defaultHref = `${this.defaultHref}/movies/${prevMovie}`;
        const queryParams = {
          segment: this.segment,
          movieStack: this.movieStack,
        };

        this.router.navigateByUrl(this.defaultHref, {
          state: { queryParams },
        });
      } else {
        const queryParams = {
          segment: this.segment,
        };

        this.defaultHref = `${this.defaultHref}/search`;
        this.router.navigateByUrl(this.defaultHref, {
          state: { queryParams },
        });
      }
    } else {
      const prevMovie = this.movieStack[1];
      if (prevMovie) {
        this.defaultHref = `${this.defaultHref}/movies/${prevMovie}`;
        this.movieStack.shift();
        const queryParams = {
          segment: this.segment,
          movieStack: this.movieStack,
        };
        this.router.navigateByUrl(this.defaultHref, {
          state: { queryParams },
        });
      } else {
        const queryParams = {
          movieStack: [],
          segment: this.segment,
        };
        this.defaultHref = `${this.defaultHref}/movies`;
        this.router.navigateByUrl(this.defaultHref, {
          state: { queryParams },
        });
      }
    }
  }

  // redendant code, might need to revisit later
  // getNewUrl(newId: string): any[] {
  //   const currentUrl = this.router.url; // Get the current URL
  //   const baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/')); // Remove the current ID from the URL
  //   const newUrl = `${baseUrl}/${newId}`; // Construct the new URL with the updated ID
  //   return [newUrl];
  // }
}
