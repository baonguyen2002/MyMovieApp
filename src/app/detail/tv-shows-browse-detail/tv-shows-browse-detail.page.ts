import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BrowseService } from 'src/app/services/browse.service';
import { IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-tv-shows-browse-detail',
  templateUrl: './tv-shows-browse-detail.page.html',
  styleUrls: ['./tv-shows-browse-detail.page.scss'],
})
export class TvShowsBrowseDetailPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll!: IonInfiniteScroll;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private browseService: BrowseService
  ) {}
  page: number = 1;
  imageBaseUrl: string = environment.images;
  genreId: string = '';
  tvShowGenreName: string = '';
  tvShowsList: any[] = [];
  blankPoster: string =
    'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg';
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

    this.tvShowGenreName = this.route.snapshot.paramMap.get(
      'genreName'
    ) as string;

    this.loadShowsWithGenre(this.genreId);
  }

  goToShowDetails(showId: string) {
    const queryParams = {
      segment: `Genre/${this.tvShowGenreName}`,
    };
    this.router.navigateByUrl(`/tabs/tvshows/${showId}`, {
      state: { queryParams },
    });
  }
  async loadShowsWithGenre(genreId: string, event?: any) {
    this.browseService.geShowsWithGenre(this.page, genreId).subscribe((res) => {
      this.tvShowsList = [...this.tvShowsList, ...res.results];

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

  loadMore(event: any) {
    this.loadShowsWithGenre(this.genreId, event);
  }
}
