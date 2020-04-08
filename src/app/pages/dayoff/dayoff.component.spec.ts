import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayoffComponent } from './dayoff.component';

describe('DayoffComponent', () => {
  let component: DayoffComponent;
  let fixture: ComponentFixture<DayoffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayoffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
