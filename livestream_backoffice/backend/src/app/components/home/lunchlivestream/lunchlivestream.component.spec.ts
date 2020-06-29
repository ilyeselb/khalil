import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchlivestreamComponent } from './lunchlivestream.component';

describe('LunchlivestreamComponent', () => {
  let component: LunchlivestreamComponent;
  let fixture: ComponentFixture<LunchlivestreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LunchlivestreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LunchlivestreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
