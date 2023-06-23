import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/data.service';
import { EventData } from '../model/event-data';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  eventdataList: EventData[] = [];
  eventDates: string[] = [];
  displayData: EventData[] = [];
  loadedItemCount: number = 4;
  itemsToLoad: number = 8;
  startIndex: number = 4;
  isDataLoaded: boolean = false;
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}
  
  ngOnInit(): void {
    this.getAllEvents();
    this.showMore();
  }

  getAllEvents() {
    this.dataService.getAllEvents().subscribe(
      (res: any[]) => {
        this.eventdataList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.event_id = e.payload.doc.id;
          return data as EventData;
        });
        this.sortData();
        this.eventDates = this.eventdataList.map((event) => event.event_date);
        this.isDataLoaded = true;
        this.displayDefaultContent();
      },
      (err: any) => {
        alert('Error while fetching events, please try again later');
      }
    );
  }

  sortData() {
    this.eventdataList.sort((a, b) => {
      return a.event_name.localeCompare(b.event_name);
    });
  }

  displayDefaultContent() {
    this.displayData = this.eventdataList.slice(0, this.loadedItemCount);
    this.displayData.forEach((event, index) => {
      event.event_date = this.eventDates[index];
    });
  }

  showMore() {
    if (!this.isDataLoaded) {
      return;
    }
    const remainingData = this.eventdataList.slice(this.startIndex);
    const newData = remainingData.slice(0, this.itemsToLoad);
    this.displayData = [...this.displayData, ...newData];
    this.displayData.forEach((event, index) => {
      event.event_date = this.eventDates[this.loadedItemCount + index];
    });
    this.startIndex += this.itemsToLoad;
  }
}
