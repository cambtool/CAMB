/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmbossSeqretComponent } from './embossSeqret.component';

describe('EmbossSeqretComponent', () => {
  let component: EmbossSeqretComponent;
  let fixture: ComponentFixture<EmbossSeqretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbossSeqretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbossSeqretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
