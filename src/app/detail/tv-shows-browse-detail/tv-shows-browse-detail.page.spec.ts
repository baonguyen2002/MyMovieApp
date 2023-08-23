import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvShowsBrowseDetailPage } from './tv-shows-browse-detail.page';

describe('TvShowsBrowseDetailPage', () => {
  let component: TvShowsBrowseDetailPage;
  let fixture: ComponentFixture<TvShowsBrowseDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TvShowsBrowseDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
