import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomaineDetailComponent } from './domaine-detail.component';

describe('DomaineDetailComponent', () => {
  let component: DomaineDetailComponent;
  let fixture: ComponentFixture<DomaineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomaineDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomaineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
