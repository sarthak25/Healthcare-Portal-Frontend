import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceAuthenComponent } from './face-authen.component';

describe('FaceAuthenComponent', () => {
  let component: FaceAuthenComponent;
  let fixture: ComponentFixture<FaceAuthenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceAuthenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceAuthenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
