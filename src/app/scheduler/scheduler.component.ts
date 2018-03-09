import {Component, ViewChild, AfterViewInit} from "@angular/core";
import {DayPilot, DayPilotSchedulerComponent} from "daypilot-pro-angular";
import {DataService, CreateEventParams, UpdateEventParams} from "./data.service";{}
import { DialogService } from "ng2-bootstrap-modal";
import {BookingDialogComponent} from "../booking-dialog/booking-dialog.component"

@Component({
  selector: 'scheduler-component',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements AfterViewInit {

  @ViewChild("scheduler")
  scheduler: DayPilotSchedulerComponent;

  events: any[] = [];
  timeFilter: {start: DayPilot.Date, end: DayPilot.Date }  = null;

  config: any = {
    eventHeight: 38,
    cellWidthSpec: "Fixed",
    cellWidth: 40,
    timeHeaders: [{"groupBy":"Day","format":"dddd, d MMMM yyyy"},{"groupBy":"Hour"},{"groupBy":"Cell","format":"mm"}],
    scale: "CellDuration",
    cellDuration: 15,
    days: 7,
    startDate: DayPilot.Date.today().firstDayOfWeek(),
    timeRangeSelectedHandling: "Enabled",
    treeEnabled: true,
    scrollTo: new DayPilot.Date(),
    heightSpec: "Max",
    height: 560,
    rowHeaderColumns: [
      {title: "Table"},
      {title: "Seats"}
    ],
    businessBeginsHour: 11,
    businessEndsHour: 24,
    showNonBusiness: false,
    durationBarVisible: false,
    eventDeleteHandling: "Update",
    onBeforeRowHeaderRender: args => {
      if (args.row.data.seats && args.row.columns[0]) {
        args.row.columns[0].html = args.row.data.seats + " seats";
      }
    },  
    onTimeRangeSelected: args => {

           var dp = args.control;
           dp.clearSelection();
          var dayPilotParams: any = {
            resource: args.resource,
            start: args.start,
            end: args.end,  
          };
    this.showEventAddPopup(dayPilotParams);
    },
    onBeforeEventRender: args => {
      args.data.html = args.data.name;      
    },

    onEventClick: args => {
      this.showEventEditPopup(args.e.data.id, args.e.data);
    },
    onEventDeleted: args => {
      this.ds.deleteEvent(args.e.data.id);
      this.scheduler.control.message("Reservation deleted.");
    }
  };
  constructor(private ds: DataService, private dialogService:DialogService) {
  }
  
  ngAfterViewInit(): void {
    this.ds.getResources().subscribe(result => this.config.resources = result);

    var from = this.scheduler.control.visibleStart();
    var to = this.scheduler.control.visibleEnd();
    this.events = this.ds.getEvents();
  }
  showEventAddPopup(eventObj) {
    let disposable = this.dialogService.addDialog(BookingDialogComponent, {
        title:'Reserve Table', 
        eventObj: eventObj})
        .subscribe((isConfirmed)=>{
            //We get dialog result
            if(isConfirmed) {
              this.events = this.ds.getEvents();
            }
        });
}

reloadEvents() {
  var dp = this.scheduler.control;
  dp.events.list = this.events;
  dp.update();
}  

showEventEditPopup(id, eventObj) {
  let disposable = this.dialogService.addDialog(BookingDialogComponent, 
    {
      title:'Reserve Table', 
      id:id,
      eventObj: eventObj
    })
      .subscribe((isConfirmed)=>{
          //We get dialog result
          if(isConfirmed) {
            this.events = this.ds.getEvents();
            this.reloadEvents();
          }
      });
}
}