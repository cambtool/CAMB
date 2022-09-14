import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataAnalysisComponent } from './data-analysis/data-analysis.component';
import { DataAnalysisModule } from './data-analysis/data-analysis.module';
import { DataFormattingModule } from './data-formatting/data-formatting.module';
import { ProtienAnalysisModule } from './protien-analysis/protien-analysis.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataAnalysisModule,
    DataFormattingModule,
    ProtienAnalysisModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
