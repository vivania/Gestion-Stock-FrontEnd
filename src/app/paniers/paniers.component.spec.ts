import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaniersComponent } from './paniers.component';

describe('PaniersComponent', () => {
  let component: PaniersComponent;
  let fixture: ComponentFixture<PaniersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaniersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaniersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
