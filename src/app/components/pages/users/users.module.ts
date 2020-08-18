import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFormComponent } from 'src/app/components/pages/users/user-form/user-form.component';

const myComponents = [UserFormComponent]

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
  exports: [...myComponents]
})
export class UsersModule { }
