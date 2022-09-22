/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PSI_blastComponent } from './PSI_blast.component';

describe('PSI_blastComponent', () => {
  let component: PSI_blastComponent;
  let fixture: ComponentFixture<PSI_blastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PSI_blastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PSI_blastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
