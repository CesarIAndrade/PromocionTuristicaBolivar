import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResearchFormComponent } from './research-form.component';

const routes: Routes = [{ path: '', component: ResearchFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResearchFormRoutingModule { }
