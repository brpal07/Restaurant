import {DataService} from "./data.service";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {SchedulerComponent} from "./scheduler.component";
import {DayPilotModule} from "daypilot-pro-angular";

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    DayPilotModule
  ],
  declarations: [
    SchedulerComponent
  ],
  exports:      [ SchedulerComponent ],
  providers:    [ DataService ]
})
export class SchedulerModule { }
