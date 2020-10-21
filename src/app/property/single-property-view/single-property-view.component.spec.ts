import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePropertyViewComponent } from './single-property-view.component';

describe('SinglePropertyViewComponent', () => {
  let component: SinglePropertyViewComponent;
  let fixture: ComponentFixture<SinglePropertyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePropertyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePropertyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
