import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecomendedArticlesComponent } from './recomended-articles.component';

const routes: Routes = [{ path: '', component: RecomendedArticlesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecomendedArticlesRoutingModule { }
