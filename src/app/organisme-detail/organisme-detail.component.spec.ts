import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismeDetailComponent } from './organisme-detail.component';

describe('OrganismeDetailComponent', () => {
  let component: OrganismeDetailComponent;
  let fixture: ComponentFixture<OrganismeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganismeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
