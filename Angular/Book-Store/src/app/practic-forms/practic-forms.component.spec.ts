import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticFormsComponent } from './practic-forms.component';

describe('PracticFormsComponent', () => {
  let component: PracticFormsComponent;
  let fixture: ComponentFixture<PracticFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
