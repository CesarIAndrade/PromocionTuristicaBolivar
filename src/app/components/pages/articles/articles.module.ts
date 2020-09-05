import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { RecomendedArticlesComponent } from './recomended-articles/recomended-articles.component';

const myComponents = [
  ArticlesListComponent,
  ArticleFormComponent,
  ArticleDetailsComponent,
  RecomendedArticlesComponent,
];

import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [...myComponents],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [...myComponents],
})
export class ArticlesModule {}
