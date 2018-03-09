import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import {SchedulerModule} from "./scheduler/scheduler.module";
import {ReactiveFormsModule} from '@angular/forms';
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component'
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent,
    BookingDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    SchedulerModule,
    BootstrapModalModule.forRoot({container:document.body})    
   
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    BookingDialogComponent
  ],
})
export class AppModule { }
