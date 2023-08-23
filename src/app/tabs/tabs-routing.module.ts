import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'movies',
        loadChildren: () =>
          import('../pages/movies/movies.module').then(
            (m) => m.MoviesPageModule
          ),
      },
      {
        path: 'tvshows',
        loadChildren: () =>
          import('../pages/tvshows/tvshows.module').then(
            (m) => m.TvshowsPageModule
          ),
      },

      {
        path: 'browse',
        loadChildren: () =>
          import('../pages/browse/browse.module').then(
            (m) => m.BrowsePageModule
          ),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('../pages/search/search.module').then(
            (m) => m.SearchPageModule
          ),
      },
      {
        path: 'movies/:id',
        loadChildren: () =>
          import('../detail/movies-detail/movies-detail.module').then(
            (m) => m.MoviesDetailPageModule
          ),
      },
      {
        path: 'tvshows/:id',
        loadChildren: () =>
          import('../detail/tv-shows-detail/tv-shows-detail.module').then(
            (m) => m.TvShowsDetailPageModule
          ),
      },
      {
        path: 'movies/:movieId/cast/:personId',
        loadChildren: () =>
          import('../pages/person/person.module').then(
            (m) => m.PersonPageModule
          ),
      },
      {
        path: 'browse/moviegenre/:genreName',
        loadChildren: () =>
          import(
            '../detail/movie-browse-detail/movie-browse-detail.module'
          ).then((m) => m.MovieBrowseDetailPageModule),
      },
      {
        path: 'browse/tvshowgenre/:genreName',
        loadChildren: () =>
          import(
            '../detail/tv-shows-browse-detail/tv-shows-browse-detail.module'
          ).then((m) => m.TvShowsBrowseDetailPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/movies',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/movies',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
