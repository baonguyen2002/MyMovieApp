import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvShowsBrowseDetailPage } from './tv-shows-browse-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TvShowsBrowseDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TvShowsBrowseDetailPageRoutingModule {}
