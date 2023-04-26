import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakingTestComponent } from './taking-test.component';

describe('TakingTestComponent', () => {
  let component: TakingTestComponent;
  let fixture: ComponentFixture<TakingTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakingTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakingTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
