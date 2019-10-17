import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskBoardComponent } from './desk-board.component';

describe('DeskBoardComponent', () => {
  let component: DeskBoardComponent;
  let fixture: ComponentFixture<DeskBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeskBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
