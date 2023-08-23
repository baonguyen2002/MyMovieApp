import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieBrowseDetailPage } from './movie-browse-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MovieBrowseDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieBrowseDetailPageRoutingModule {}
