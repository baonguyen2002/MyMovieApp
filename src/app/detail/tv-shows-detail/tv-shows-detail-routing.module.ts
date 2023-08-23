import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvShowsDetailPage } from './tv-shows-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TvShowsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TvShowsDetailPageRoutingModule {}
