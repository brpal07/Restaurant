import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import {DayPilot} from 'daypilot-pro-angular';



@Injectable()
export class DataService {
  
  events: any[] = [
    {
      id: 1,
      resource: "1",
      start: "2018-03-08T11:00:00",
      end: "2018-03-08T13:00:00",
      name: "Bhupendra Pal",
      email:"brpal07@gmail.com",
      mobileno:"8690219898",
      r_status:"Arrived",
      r_type:"Walk-In",
    },
    {
      id: 2,
      resource: "2",
      start: "2018-03-08T13:00:00",
      end: "2018-03-08T15:00:00",
      name: "Dipam singh",
      email:"dipam07@gmail.com",
      mobileno:"8690218686",
      r_status:"Arrived",
      r_type:"Walk-In",
      
    }
    
  ];

  constructor(private http : Http){
  }

  getEvents(): any[] {
    return this.events;
  }

  getResources(): Observable<any[]> {

    return this.http.get("assets/data.json").map((response:Response) => response.json());
  }

  createEvent(eventObj: CreateEventParams) {
    eventObj.id = this.events.length ? this.events[this.events.length-1].id + 1 : 1;
    this.events.push(eventObj);
  }
 
  deleteEvent(id: number) {
    let foundIndex = this.getIndex(id);
    if(foundIndex>=0){
      this.events.splice(foundIndex,1);
      return true;
    }
    else
      return false;
  }

  getIndex(id: number){
    let foundIndex = -1;
    for(let i=0;i<this.events.length;i++)
      if(id === this.events[i].id)
        foundIndex = i;
    return foundIndex;
  }

  updateEvent(eventObj: UpdateEventParams){
    let foundIndex = this.getIndex(eventObj.id);
    if(foundIndex>=0){
      this.events[foundIndex] = eventObj;
      return true;
    }
    else
      return false;
  }


}

export interface CreateEventParams {
  id:number;
  start: DayPilot.Date;
  end: DayPilot.Date;
  resource: string;
  name: string;
  text: string;
  email: string;
  mobileno:string;
  r_status:string;
  r_type:string;
  
}

export interface CreateEventResponse {
  id: number;
  resource: string;
  start: DayPilot.Date;
  end: DayPilot.Date;
  name: string;
  email: string;
  mobileno:string;
  r_status:string;
  r_type:string;
  
}
export interface UpdateEventParams {
  id: number;
  name: string;
  email: string;
  mobileno:string;
  r_status:string;
  r_type:string;
}
