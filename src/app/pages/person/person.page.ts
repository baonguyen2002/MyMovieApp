import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieService: MoviesService
  ) {}
  segment: string = '';
  imageBaseUrl = environment.images;
  blankAvatar: string =
    'https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg';
  person: any = {};
  personId: string = '';
  movieId: string = '';
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
    }

    this.personId = this.route.snapshot.paramMap.get('personId') as string;
    this.movieId = this.route.snapshot.paramMap.get('movieId') as string;

    this.movieService.getCastDetail(this.personId).subscribe((res) => {
      this.person = res;
    });
  }

  goBack() {
    const queryParams = { segment: `${this.segment}` };

    this.router.navigateByUrl(`/tabs/movies/${this.movieId}`, {
      state: { queryParams },
    });
  }
}
