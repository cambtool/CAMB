import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtienAnalysisComponent } from './protien-analysis.component';

const routes: Routes = [{ path: '', component: ProtienAnalysisComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtienAnalysisRoutingModule { }
