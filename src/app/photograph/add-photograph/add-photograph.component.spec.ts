import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhotographComponent } from './add-photograph.component';

describe('AddPhotographComponent', () => {
  let component: AddPhotographComponent;
  let fixture: ComponentFixture<AddPhotographComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPhotographComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhotographComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
