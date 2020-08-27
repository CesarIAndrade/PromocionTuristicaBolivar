import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResearchItemComponent } from './research-item/research-item.component';
import { ResearchListComponent } from './research-list/research-list.component';
import { ResearchFormComponent } from './research-form/research-form.component';

let myComponents = [ResearchItemComponent, ResearchListComponent, ResearchFormComponent];

import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components.module';

@NgModule({
  declarations: [...myComponents],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports: [...myComponents]
})
export class ResearchModule { }
