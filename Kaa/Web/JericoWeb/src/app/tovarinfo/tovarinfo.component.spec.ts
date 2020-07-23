import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TovarinfoComponent } from './tovarinfo.component';

describe('TovarinfoComponent', () => {
  let component: TovarinfoComponent;
  let fixture: ComponentFixture<TovarinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TovarinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TovarinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
