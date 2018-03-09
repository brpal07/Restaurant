import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup ,Validators} from '@angular/forms';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { DataService } from 'app/scheduler/data.service';

export interface ConfirmModel {
  title:string;
  id: number;
  myForm :FormGroup;
  eventObj: any
}

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.css']
})
export class BookingDialogComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  title: string;
  myForm: FormGroup;
  id: number;
  eventObj: any;
  constructor(dialogService: DialogService,private fb:FormBuilder,private ds:DataService) { 
    super(dialogService);    
  }
   saveEvent() {
    var eventAddObj = this.myForm.value;
    eventAddObj.id = this.eventObj.id;
    eventAddObj.resource = this.eventObj.resource;
    eventAddObj.start = this.eventObj.start;
    eventAddObj.end = this.eventObj.end;

    this.ds.createEvent(eventAddObj);
    this.result = true;
    this.close();
  }

  updateEvent() {
    var eventAddObj = this.myForm.value;
    eventAddObj.id = this.eventObj.id;
    eventAddObj.resource = this.eventObj.resource;
    eventAddObj.start = this.eventObj.start;
    eventAddObj.end = this.eventObj.end;

    this.ds.updateEvent(eventAddObj);
    this.result = true;
    this.close();
  }
  options=[
    {name:"Arrived",value:"Arrived"},
    {name:"Seated",value:"Seated"},
    {name:"Finished",value:"Finished"},
    {name:"Cancel",value:"Cancel"},
    {name:"No-Show",value:"No-Show"}
  ];
  optiont=[
    {name:"Walk-In",value:"Walk-In"},
    {name:"Phone Reservation",value:"Phone Reservation"},
    {name:"Online Reservation",value:"Online Reservation"}
  ];
 
  ngOnInit() {

    this.myForm=this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.email],
      mobileno: [null,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      r_status: [null, Validators.required],
      r_type: [null, Validators.required]
    });

    this.myForm.patchValue({
      "name": this.eventObj.name,
      "email": this.eventObj.email,
      "mobileno": this.eventObj.mobileno,
      "r_status": this.eventObj.r_status,
      "r_type": this.eventObj.r_type
    });
  }
}
