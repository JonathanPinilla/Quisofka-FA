import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentlyAskedComponent } from './frequently-asked.component';

describe('FrequentlyAskedComponent', () => {
  let component: FrequentlyAskedComponent;
  let fixture: ComponentFixture<FrequentlyAskedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrequentlyAskedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrequentlyAskedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
