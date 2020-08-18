import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { ArticlesModule } from 'src/app/components/pages/articles/articles.module'
import { UsersModule } from 'src/app/components/pages/users/users.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ArticlesModule,
    UsersModule
  ]
})
export class HomeModule { }
