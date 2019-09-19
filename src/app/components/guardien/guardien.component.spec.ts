import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardienComponent } from './guardien.component';

describe('GuardienComponent', () => {
  let component: GuardienComponent;
  let fixture: ComponentFixture<GuardienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
