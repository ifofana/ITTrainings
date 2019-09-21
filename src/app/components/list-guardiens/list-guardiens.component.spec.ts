import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGuardiensComponent } from './list-guardiens.component';

describe('ListGuardiensComponent', () => {
  let component: ListGuardiensComponent;
  let fixture: ComponentFixture<ListGuardiensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGuardiensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGuardiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
