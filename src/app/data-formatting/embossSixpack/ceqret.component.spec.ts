/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CeqretComponent } from './ceqret.component';

describe('CeqretComponent', () => {
  let component: CeqretComponent;
  let fixture: ComponentFixture<CeqretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeqretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeqretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
