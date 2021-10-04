import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapMenuComponent } from './bootstrap-menu.component';

describe('BootstrapMenuComponent', () => {
  let component: BootstrapMenuComponent;
  let fixture: ComponentFixture<BootstrapMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootstrapMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
