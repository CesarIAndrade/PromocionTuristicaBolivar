import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleFormComponent } from './article-form.component';

const routes: Routes = [{ path: '', component: ArticleFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleFormRoutingModule { }
