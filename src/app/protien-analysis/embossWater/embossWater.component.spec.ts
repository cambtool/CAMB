/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmbossWaterComponent } from './embossWater.component';

describe('EmbossWaterComponent', () => {
  let component: EmbossWaterComponent;
  let fixture: ComponentFixture<EmbossWaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbossWaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbossWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
