import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmbossSeqretComponent } from './embossSeqret/embossSeqret.component';
import { DataformatingService } from './dataformating.service';
import { CeqretComponent } from './ceqret/ceqret.component';


const routes: Routes = [{ path: 'EMBOSS', component: EmbossSeqretComponent },
{ path: 'ceqret', component: CeqretComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class DataFormattingRoutingModule { }
