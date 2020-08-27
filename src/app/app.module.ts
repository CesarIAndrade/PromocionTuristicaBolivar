import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { ActivitiesModule } from './components/pages/activities/activities.module';
import { ResearchModule } from './components/pages/research/research.module';
import { ComponentsModule } from './components/components.module';
import { PersonsModule } from './components/pages/persons/persons.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ActivitiesModule,
    ResearchModule,
    ComponentsModule,
    PersonsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
