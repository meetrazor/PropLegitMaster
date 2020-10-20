import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPhotographComponent } from './view-photograph.component';

describe('ViewPhotographComponent', () => {
  let component: ViewPhotographComponent;
  let fixture: ComponentFixture<ViewPhotographComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPhotographComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPhotographComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
