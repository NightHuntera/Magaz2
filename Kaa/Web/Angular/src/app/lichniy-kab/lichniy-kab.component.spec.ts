import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LichniyKabComponent } from './lichniy-kab.component';

describe('LichniyKabComponent', () => {
  let component: LichniyKabComponent;
  let fixture: ComponentFixture<LichniyKabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichniyKabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichniyKabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
