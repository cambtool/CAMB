import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dataFormatting', loadChildren: () => import('./data-formatting/data-formatting.module').then(m => m.DataFormattingModule) },
  { path: 'dataAnalysis', loadChildren: () => import('./data-analysis/data-analysis.module').then(m => m.DataAnalysisModule) },
  { path: 'protienAnalysis', loadChildren: () => import('./protien-analysis/protien-analysis.module').then(m => m.ProtienAnalysisModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
