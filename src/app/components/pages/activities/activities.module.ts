import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityFormComponent } from './activity-form/activity-form.component';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { ActivityModalComponent } from './activity-modal/activity-modal.component';

let myComponents = [
  ActivityFormComponent,
  ActivitiesListComponent,
  ActivityDetailsComponent,
  ActivityModalComponent,
];

import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [myComponents],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [myComponents],
  entryComponents: [ActivityModalComponent],
})
export class ActivitiesModule {}
