/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmbosTranseqComponent } from './embosTranseq.component';

describe('EmbosTranseqComponent', () => {
  let component: EmbosTranseqComponent;
  let fixture: ComponentFixture<EmbosTranseqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbosTranseqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbosTranseqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
