/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IsochoreComponent } from './isochore.component';

describe('IsochoreComponent', () => {
  let component: IsochoreComponent;
  let fixture: ComponentFixture<IsochoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsochoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsochoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
