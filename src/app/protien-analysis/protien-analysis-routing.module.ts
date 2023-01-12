import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtienAnalysisComponent } from './protien-analysis.component';
import { PepinfoComponent } from './pepinfo/pepinfo.component';
import { PepStatsComponent } from './pepStats/pepStats.component';

const routes: Routes = [
  { path: 'pepInfo', component: PepinfoComponent },
  { path: 'pepstat', component: PepStatsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ProtienAnalysisRoutingModule { }
