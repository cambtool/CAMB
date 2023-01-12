import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtienAnalysisComponent } from './protien-analysis.component';
import { PepinfoComponent } from './pepinfo/pepinfo.component';
import { PepStatsComponent } from './pepStats/pepStats.component';
import { PepWindowComponent } from './pepWindow/pepWindow.component';
import { SequenceStatistsComponent } from './sequenceStatists/sequenceStatists.component';
import { EmbossWaterComponent } from './embossWater/embossWater.component';

const routes: Routes = [
  { path: 'pepInfo', component: PepinfoComponent },
  { path: 'pepstat', component: PepStatsComponent },
  { path: 'pepwindow', component: PepWindowComponent },
  { path: 'ststists', component: SequenceStatistsComponent },
  { path: 'water', component: EmbossWaterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ProtienAnalysisRoutingModule { }
