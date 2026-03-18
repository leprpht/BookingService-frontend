import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyUnitsList } from './property-units-list';

describe('PropertyUnitsList', () => {
  let component: PropertyUnitsList;
  let fixture: ComponentFixture<PropertyUnitsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyUnitsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyUnitsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
