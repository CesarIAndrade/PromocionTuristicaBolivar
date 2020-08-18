import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'articles-list',
    loadChildren: () =>
      import(
        './components/pages/articles/articles-list/articles-list.module'
      ).then((m) => m.ArticlesListModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/pages/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'article-form/:id',
    loadChildren: () =>
      import(
        './components/pages/articles/article-form/article-form.module'
      ).then((m) => m.ArticleFormModule),
  },
  {
    path: 'article-form',
    loadChildren: () =>
      import(
        './components/pages/articles/article-form/article-form.module'
      ).then((m) => m.ArticleFormModule),
  },
  {
    path: 'user-form',
    loadChildren: () =>
      import('./components/pages/users/user-form/user-form.module').then(
        (m) => m.UserFormModule
      ),
  },
  {
    path: 'activity-form',
    loadChildren: () =>
      import(
        './components/pages/activities/activity-form/activity-form.module'
      ).then((m) => m.ActivityFormModule),
  },
  {
    path: 'activities-list',
    loadChildren: () =>
      import(
        './components/pages/activities/activities-list/activities-list.module'
      ).then((m) => m.ActivitiesListModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
