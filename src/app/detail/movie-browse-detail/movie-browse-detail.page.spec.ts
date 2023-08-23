import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieBrowseDetailPage } from './movie-browse-detail.page';

describe('MovieBrowseDetailPage', () => {
  let component: MovieBrowseDetailPage;
  let fixture: ComponentFixture<MovieBrowseDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MovieBrowseDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
