import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectFavouriteComponent } from './subject-favourite.component';

describe('SubjectFavouriteComponent', () => {
  let component: SubjectFavouriteComponent;
  let fixture: ComponentFixture<SubjectFavouriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectFavouriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectFavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
