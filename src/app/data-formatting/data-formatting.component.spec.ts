/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DataFormattingComponent } from './data-formatting.component';

describe('DataFormattingComponent', () => {
  let component: DataFormattingComponent;
  let fixture: ComponentFixture<DataFormattingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataFormattingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFormattingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
