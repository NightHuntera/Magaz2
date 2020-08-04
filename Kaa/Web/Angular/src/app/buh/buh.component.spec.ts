import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuhComponent } from './buh.component';

describe('BuhComponent', () => {
  let component: BuhComponent;
  let fixture: ComponentFixture<BuhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
