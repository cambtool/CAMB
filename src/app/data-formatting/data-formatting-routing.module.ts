import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmbossSeqretComponent } from './embossSeqret/embossSeqret.component';
import { DataformatingService } from './dataformating.service';
import { CeqretComponent } from './ceqret/ceqret.component';
import { PhylogencyComponent } from './Phylogency/Phylogency.component';
import { PSI_blastComponent } from './PSI_blast/PSI_blast.component';


const routes: Routes = [
  { path: 'EMBOSS', component: EmbossSeqretComponent },
  { path: 'ceqret', component: CeqretComponent },
  { path: 'Phylogeny', component: PhylogencyComponent },
  { path: 'PSi', component: PSI_blastComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class DataFormattingRoutingModule { }
