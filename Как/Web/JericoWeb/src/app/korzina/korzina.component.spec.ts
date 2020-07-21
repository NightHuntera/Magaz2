import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KorzinaComponent } from './korzina.component';

describe('KorzinaComponent', () => {
  let component: KorzinaComponent;
  let fixture: ComponentFixture<KorzinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KorzinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KorzinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
