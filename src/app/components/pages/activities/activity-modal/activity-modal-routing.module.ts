import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityModalComponent } from './activity-modal.component';

const routes: Routes = [{ path: '', component: ActivityModalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityModalRoutingModule { }
