/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmbossNewcpgreportComponent } from './embossNewcpgreport.component';

describe('EmbossNewcpgreportComponent', () => {
  let component: EmbossNewcpgreportComponent;
  let fixture: ComponentFixture<EmbossNewcpgreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbossNewcpgreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbossNewcpgreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
