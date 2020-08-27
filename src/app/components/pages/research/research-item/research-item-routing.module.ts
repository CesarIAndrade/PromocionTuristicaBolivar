import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResearchItemComponent } from './research-item.component';

const routes: Routes = [{ path: '', component: ResearchItemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResearchItemRoutingModule { }
