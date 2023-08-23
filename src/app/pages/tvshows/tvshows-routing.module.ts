import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TvshowsPage } from './tvshows.page';

const routes: Routes = [
  {
    path: '',
    component: TvshowsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TvshowsPageRoutingModule {}
