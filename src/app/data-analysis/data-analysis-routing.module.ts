import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataAnalysisComponent } from './data-analysis.component';
import { EmbossNewcpgreportComponent } from './embossNewcpgreport/embossNewcpgreport.component';
import { GeneWiseComponent } from './geneWise/geneWise.component';
import { SeqckSumComponent } from './SeqckSum/SeqckSum.component';
import { IsochoreComponent } from './isochore/isochore.component';
import { CPGPLOTComponent } from './CPGPLOT/CPGPLOT.component';
import { EmbosTranseqComponent } from './embosTranseq/embosTranseq.component';
import { BackTranseqComponent } from './backTranseq/backTranseq.component';

const routes: Routes = [
  { path: 'Newcpgreport', component: EmbossNewcpgreportComponent },
  { path: 'GeneWise', component: GeneWiseComponent },
  { path: 'seqcksum', component: SeqckSumComponent },
  { path: 'Isochore', component: IsochoreComponent },
  { path: 'CPGPLOT', component: CPGPLOTComponent },
  {path: 'Transeq',component: EmbosTranseqComponent} ,
  {path: 'BackTranSeq',component: BackTranseqComponent},
  {path: 'Detail',component: DataAnalysisComponent},

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataAnalysisRoutingModule { }
