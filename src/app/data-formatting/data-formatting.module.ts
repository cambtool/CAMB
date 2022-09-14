import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataFormattingRoutingModule } from './data-formatting-routing.module';
import { DataFormattingComponent } from './data-formatting.component';


@NgModule({
  declarations: [
    DataFormattingComponent
  ],
  imports: [
    CommonModule,
    DataFormattingRoutingModule
  ]
})
export class DataFormattingModule { }
