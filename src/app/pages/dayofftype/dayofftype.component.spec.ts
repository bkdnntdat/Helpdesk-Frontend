import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayofftypeComponent } from './dayofftype.component';

describe('DayofftypeComponent', () => {
  let component: DayofftypeComponent;
  let fixture: ComponentFixture<DayofftypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayofftypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayofftypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
