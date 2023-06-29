import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventData } from '../model/event-data';

@Component({
  selector: 'app-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.css']
})
export class EventsDashboardComponent implements OnInit{

  selectedData: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectedData = history.state;
  console.log('Selected Data:', this.selectedData);

  const { event_openHrs, event_closeHrs } = this.selectedData;
  console.log('eat_openHrs:', event_openHrs);
  console.log('eat_closeHrs:', event_closeHrs);
  
  console.log('Time parameter:', this.formatTime(event_openHrs));
  console.log('Time parameter:', this.formatTime(event_closeHrs));
  }

  formatTime(time: string): string {
    console.log('Time parameter:', time);
  
    if (time === '24 Hours') {
      return time; // Return "24 Hours" as is
    }
  
    if (time === '-' || !time) {
      return ''; // Return an empty string or handle the case when time is '-' or undefined
    }
  
    // Convert the time string to a JavaScript Date object
    const date = new Date(`2000-01-01T${time}`);
  
    // Format the time using options for hour12 and hourCycle
    const formattedTime = date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      hourCycle: 'h23'
    });
  
    return formattedTime; // Return the formatted time without the label
  }

  getImageUrl(eventdata: EventData): string {
    return eventdata.event_image;
  }

}

