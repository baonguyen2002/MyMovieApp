import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvshowsPage } from './tvshows.page';

describe('TvshowsPage', () => {
  let component: TvshowsPage;
  let fixture: ComponentFixture<TvshowsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TvshowsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
