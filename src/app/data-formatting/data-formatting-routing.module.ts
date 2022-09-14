import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataFormattingComponent } from './data-formatting.component';

const routes: Routes = [{ path: '', component: DataFormattingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataFormattingRoutingModule { }
