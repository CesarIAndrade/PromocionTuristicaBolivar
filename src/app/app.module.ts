import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './components/header/header.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component'

import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { ActivitiesModule } from './components/pages/activities/activities.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ConfirmModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ActivitiesModule
  ],
  entryComponents: [ConfirmModalComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
