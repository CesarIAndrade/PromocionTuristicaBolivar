import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityFormComponent } from './activity-form/activity-form.component';
import { ActivitiesListComponent } from './activities-list/activities-list.component';

let myComponents = [ActivityFormComponent, ActivitiesListComponent]

import { MaterialModule } from 'src/app/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [myComponents],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [myComponents]
})
export class ActivitiesModule { }
