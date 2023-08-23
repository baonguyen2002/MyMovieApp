import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TvShowsBrowseDetailPageRoutingModule } from './tv-shows-browse-detail-routing.module';

import { TvShowsBrowseDetailPage } from './tv-shows-browse-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TvShowsBrowseDetailPageRoutingModule
  ],
  declarations: [TvShowsBrowseDetailPage]
})
export class TvShowsBrowseDetailPageModule {}
