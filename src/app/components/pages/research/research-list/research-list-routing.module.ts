import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResearchListComponent } from './research-list.component';

const routes: Routes = [{ path: '', component: ResearchListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResearchListRoutingModule { }
