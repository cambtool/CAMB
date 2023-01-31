import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataAnalysisModule } from './data-analysis/data-analysis.module';
import { ProtienAnalysisModule } from './protien-analysis/protien-analysis.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './interceptors/loader-interceptor.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './home/home.component';
import { DataFormattingModule } from './data-formatting/data-formatting.module';
@NgModule({
  declarations: [	
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
   ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    DataAnalysisModule,
    ProtienAnalysisModule,
    DataFormattingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  exports: [
    CommonModule,
    MatSelectModule,

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
