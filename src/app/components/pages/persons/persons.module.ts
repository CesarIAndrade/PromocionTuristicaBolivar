import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsFormComponent } from './persons-form/persons-form.component';
import { PersonsModalComponent } from './persons-modal/persons-modal.component';

let myComponents = [PersonsFormComponent, PersonsModalComponent]

import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [...myComponents],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [...myComponents],
  entryComponents: [PersonsModalComponent]
})
export class PersonsModule { }
