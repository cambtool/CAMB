/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CPGPLOTComponent } from './CPGPLOT.component';

describe('CPGPLOTComponent', () => {
  let component: CPGPLOTComponent;
  let fixture: ComponentFixture<CPGPLOTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CPGPLOTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CPGPLOTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
