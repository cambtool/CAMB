/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FASTAComponent } from './FASTA.component';

describe('FASTAComponent', () => {
  let component: FASTAComponent;
  let fixture: ComponentFixture<FASTAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FASTAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FASTAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
