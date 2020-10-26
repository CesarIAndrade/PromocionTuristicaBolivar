import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { ArticlesModule } from 'src/app/components/pages/articles/articles.module'
import { UsersModule } from 'src/app/components/pages/users/users.module';
import { ActivitiesModule } from 'src/app/components/pages/activities/activities.module';
import { ResearchModule } from 'src/app/components/pages/research/research.module';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ArticlesModule,
    UsersModule,
    ActivitiesModule,
    ResearchModule,
    ComponentsModule
  ]
})
export class HomeModule { }
