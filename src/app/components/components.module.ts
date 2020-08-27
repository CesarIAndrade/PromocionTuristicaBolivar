import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

let myComponents = [ConfirmModalComponent, HeaderComponent, SearchBarComponent];

import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [...myComponents],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [...myComponents]
})
export class ComponentsModule { }
