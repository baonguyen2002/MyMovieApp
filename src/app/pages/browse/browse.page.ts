import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowseService } from 'src/app/services/browse.service';
@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
})
export class BrowsePage implements OnInit {
  constructor(private browseService: BrowseService, private router: Router) {}
  segment: string = 'movie';
  movieImageList: any[] = [];
  tvShowsImageList: any[] = [];
  moviesGenresList: any[] = [];
  tvShowsGenresList: any[] = [];
  genre: any;
  ngOnInit() {
    fetch('./assets/moviesgenreImages.json')
      .then((res) => res.json())
      .then((json) => {
        this.movieImageList = json;
      });

    fetch('./assets/tvshowsgenreImages.json')
      .then((res) => res.json())
      .then((json) => {
        this.tvShowsImageList = json;
      });

    this.loadMoviesGenresList();
    this.loadTvShowsGenresList();
  }

  extractGenreId(list: any[], genreName: string): any {
    this.genre = list.filter((data) => data.name === genreName);
    return this.genre[0].id;
  }

  goToMovieGenre(genreName: string) {
    const queryParams = {
      id: this.extractGenreId(this.moviesGenresList, genreName),
    };

    this.router.navigateByUrl(`/tabs/browse/moviegenre/${genreName}`, {
      state: { queryParams },
    });
  }

  goToTvShowGenre(genreName: string) {
    const queryParams = {
      id: this.extractGenreId(this.tvShowsGenresList, genreName),
    };

    this.router.navigateByUrl(`/tabs/browse/tvshowgenre/${genreName}`, {
      state: { queryParams },
    });
  }

  async loadMoviesGenresList() {
    this.browseService.getMoviesGenresList().subscribe((res) => {
      this.moviesGenresList = [...this.moviesGenresList, ...res.genres];
    });
  }

  async loadTvShowsGenresList() {
    this.browseService.getTvShowsGenresList().subscribe((res) => {
      this.tvShowsGenresList = [...this.tvShowsGenresList, ...res.genres];
    });
  }
}
