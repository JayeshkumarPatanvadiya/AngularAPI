import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectFavouriteChildComponent } from './subject-favourite-child.component';
import { Component, Input } from '@angular/core';
describe('SubjectFavouriteChildComponent', () => {
  let component: SubjectFavouriteChildComponent;
  let fixture: ComponentFixture<SubjectFavouriteChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubjectFavouriteChildComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectFavouriteChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
