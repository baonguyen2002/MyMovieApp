import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TvShowsDetailPageRoutingModule } from './tv-shows-detail-routing.module';

import { TvShowsDetailPage } from './tv-shows-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TvShowsDetailPageRoutingModule
  ],
  declarations: [TvShowsDetailPage]
})
export class TvShowsDetailPageModule {}
