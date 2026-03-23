import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPage } from './property-page';

describe('PropertyDetails', () => {
  let component: PropertyPage;
  let fixture: ComponentFixture<PropertyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
