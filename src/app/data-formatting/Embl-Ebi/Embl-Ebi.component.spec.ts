/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmblEbiComponent } from './Embl-Ebi.component';

describe('EmblEbiComponent', () => {
  let component: EmblEbiComponent;
  let fixture: ComponentFixture<EmblEbiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmblEbiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmblEbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
