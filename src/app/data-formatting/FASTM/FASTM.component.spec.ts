/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FASTMComponent } from './FASTM.component';

describe('FASTMComponent', () => {
  let component: FASTMComponent;
  let fixture: ComponentFixture<FASTMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FASTMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FASTMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
