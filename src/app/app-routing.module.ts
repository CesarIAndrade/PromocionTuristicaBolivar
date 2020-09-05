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
    path: 'activity-form/:id',
    loadChildren: () =>
      import(
        './components/pages/activities/activity-form/activity-form.module'
      ).then((m) => m.ActivityFormModule),
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
  {
    path: 'research-list',
    loadChildren: () =>
      import(
        './components/pages/research/research-list/research-list.module'
      ).then((m) => m.ResearchListModule),
  },
  {
    path: 'research-item',
    loadChildren: () =>
      import(
        './components/pages/research/research-item/research-item.module'
      ).then((m) => m.ResearchItemModule),
  },
  {
    path: 'research-form',
    loadChildren: () =>
      import(
        './components/pages/research/research-form/research-form.module'
      ).then((m) => m.ResearchFormModule),
  },
  {
    path: 'research-form/:id',
    loadChildren: () =>
      import(
        './components/pages/research/research-form/research-form.module'
      ).then((m) => m.ResearchFormModule),
  },
  {
    path: 'person-form',
    loadChildren: () =>
      import(
        './components/pages/persons/persons-form/persons-form.module'
      ).then((m) => m.PersonsFormModule),
  },
  {
    path: 'activity-details',
    loadChildren: () =>
      import(
        './components/pages/activities/activity-details/activity-details.module'
      ).then((m) => m.ActivityDetailsModule),
  },
  {
    path: 'acticle-details/:id',
    loadChildren: () =>
      import(
        './components/pages/articles/article-details/article-details.module'
      ).then((m) => m.ArticleDetailsModule),
  },
  { path: 'recomended-articles', loadChildren: () => import('./components/pages/articles/recomended-articles/recomended-articles.module').then(m => m.RecomendedArticlesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
