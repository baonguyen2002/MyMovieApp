import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieBrowseDetailPageRoutingModule } from './movie-browse-detail-routing.module';

import { MovieBrowseDetailPage } from './movie-browse-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieBrowseDetailPageRoutingModule
  ],
  declarations: [MovieBrowseDetailPage]
})
export class MovieBrowseDetailPageModule {}
