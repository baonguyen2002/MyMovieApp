import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { getName as getFullCountriesName } from 'country-list';
import iso6391 from 'iso-639-1';

@Component({
  selector: 'app-tv-shows-detail',
  templateUrl: './tv-shows-detail.page.html',
  styleUrls: ['./tv-shows-detail.page.scss'],
})
export class TvShowsDetailPage implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tvService: TvShowsService
  ) {}

  segment: string = '';
  fullCountriesLanguagesName: any[] = [];
  fullCountriesName: any[] = [];
  inProduction: string = 'No';
  hasOriginCountry: boolean = false;
  hasLanguages: boolean = false;
  blankPoster: string =
    'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg';
  imageBaseUrl = environment.images;
  tvShowId: string = '';
  tvShow: any = {};
  defaultHref: string = '/tabs';
  goBack() {
    if (this.segment.includes('Genre')) {
      const genre = this.segment.split('/')[1];

      this.defaultHref = `${this.defaultHref}/browse/tvshowgenre/${genre}`;
      this.router.navigateByUrl(this.defaultHref);
    } else if (this.segment === 'tvshows') {
      this.defaultHref = `${this.defaultHref}/search`;
      const queryParams = {
        segment: this.segment,
      };
      this.router.navigateByUrl(this.defaultHref, { state: { queryParams } });
    } else {
      this.defaultHref = `${this.defaultHref}/tvshows`;
    }
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
        console.log('failed');
      }
    }

    this.tvShowId = this.route.snapshot.paramMap.get('id') as string;
    this.tvService.getShowDetails(this.tvShowId).subscribe((res) => {
      this.tvShow = res;

      if ((this.tvShow.in_production = true)) {
        this.inProduction = 'Yes';
      }
      if (this.tvShow.origin_country.length != 0) {
        this.hasOriginCountry = true;
      }
      this.fullCountriesName = this.tvShow.origin_country.map(
        (countryCode: string) => getFullCountriesName(countryCode)
      );
      if (this.tvShow.languages.length != 0) {
        this.hasLanguages = true;
      }
      this.fullCountriesLanguagesName = this.tvShow.languages.map(
        (languageCode: string) => iso6391.getName(languageCode)
      );
    });
  }
  goToWebsite(url: string): void {
    window.open(url, '_blank');
  }
}
