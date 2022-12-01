/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BackTranseqComponent } from './backTranseq.component';

describe('BackTranseqComponent', () => {
  let component: BackTranseqComponent;
  let fixture: ComponentFixture<BackTranseqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackTranseqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackTranseqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
