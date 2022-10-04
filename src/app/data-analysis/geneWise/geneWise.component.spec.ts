/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GeneWiseComponent } from './geneWise.component';

describe('GeneWiseComponent', () => {
  let component: GeneWiseComponent;
  let fixture: ComponentFixture<GeneWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
