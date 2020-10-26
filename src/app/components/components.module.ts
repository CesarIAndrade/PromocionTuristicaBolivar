import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SocialComponent } from './social/social.component';
import { SliderComponent } from './slider/slider.component';

let myComponents = [
  ConfirmModalComponent,
  HeaderComponent,
  SearchBarComponent,
  SocialComponent,
  SliderComponent,
];

import { MaterialModule } from 'src/app/material.module';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [...myComponents],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [...myComponents],
})
export class ComponentsModule {}
