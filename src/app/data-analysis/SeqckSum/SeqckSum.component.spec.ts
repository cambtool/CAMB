/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SeqckSumComponent } from './SeqckSum.component';

describe('SeqckSumComponent', () => {
  let component: SeqckSumComponent;
  let fixture: ComponentFixture<SeqckSumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeqckSumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeqckSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
