/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PhylogencyComponent } from './Phylogency.component';

describe('PhylogencyComponent', () => {
  let component: PhylogencyComponent;
  let fixture: ComponentFixture<PhylogencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhylogencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhylogencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
