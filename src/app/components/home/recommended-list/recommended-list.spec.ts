import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedList } from './recommended-list';

describe('RecommendedList', () => {
  let component: RecommendedList;
  let fixture: ComponentFixture<RecommendedList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedList],
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendedList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
