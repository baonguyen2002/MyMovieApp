import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvShowsDetailPage } from './tv-shows-detail.page';

describe('TvShowsDetailPage', () => {
  let component: TvShowsDetailPage;
  let fixture: ComponentFixture<TvShowsDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TvShowsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
