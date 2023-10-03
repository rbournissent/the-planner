import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OverlayModule } from '@angular/cdk/overlay'
import { PortalModule } from '@angular/cdk/portal';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { reducers } from './state/reducers';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { EventComponent } from './components/event/event.component';
import { ShiftFormComponent } from './components/shift-form/shift-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SvgIconComponent,
    EventComponent,
    ShiftFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    OverlayModule,
    PortalModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
