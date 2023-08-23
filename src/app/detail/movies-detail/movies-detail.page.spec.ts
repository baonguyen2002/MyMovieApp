import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesDetailPage } from './movies-detail.page';

describe('MoviesDetailPage', () => {
  let component: MoviesDetailPage;
  let fixture: ComponentFixture<MoviesDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MoviesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
