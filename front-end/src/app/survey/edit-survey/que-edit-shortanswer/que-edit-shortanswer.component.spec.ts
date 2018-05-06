import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueEditShortanswerComponent } from './que-edit-shortanswer.component';

describe('QueEditShortanswerComponent', () => {
  let component: QueEditShortanswerComponent;
  let fixture: ComponentFixture<QueEditShortanswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueEditShortanswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueEditShortanswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
