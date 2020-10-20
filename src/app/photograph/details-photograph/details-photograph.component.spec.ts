import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPhotographComponent } from './details-photograph.component';

describe('DetailsPhotographComponent', () => {
  let component: DetailsPhotographComponent;
  let fixture: ComponentFixture<DetailsPhotographComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPhotographComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPhotographComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
