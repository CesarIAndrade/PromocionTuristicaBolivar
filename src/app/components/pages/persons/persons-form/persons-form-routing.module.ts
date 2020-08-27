import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonsFormComponent } from './persons-form.component';

const routes: Routes = [{ path: '', component: PersonsFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsFormRoutingModule { }
