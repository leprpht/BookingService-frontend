import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedOffers } from './featured-offers';

describe('FeaturedOffers', () => {
  let component: FeaturedOffers;
  let fixture: ComponentFixture<FeaturedOffers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedOffers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedOffers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
