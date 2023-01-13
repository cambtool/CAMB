/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PrattComponent } from './pratt.component';

describe('PrattComponent', () => {
  let component: PrattComponent;
  let fixture: ComponentFixture<PrattComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrattComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrattComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
