import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttData } from '../model/att-data';
import { EatData } from '../model/eat-data';
import { EventData } from '../model/event-data';
import { SearchbarService } from '../searchbar.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  searchQuery: string = '';
  attdataList: AttData[] = [];
  eatDataList: EatData[] = [];
  eventDataList: EventData[] = [];
  attNames: string[] = [];
  eateriesNames: string[] = [];
  eventNames: string[] = [];
  

  constructor(
    private router: Router,
    private searchbarService: SearchbarService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.fetchAttData();
    this.fetchEateriesData();
    this.fetchEventsData();
  }

  getAllAttractions() {
    this.dataService.getAllAttractions().subscribe(
      (res: any) => {
        this.attdataList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.att_id = e.payload.doc.id;
          this.attNames.push(data.att_name);
          return data;
        });
      },
      (err: any) => {
        alert('Error while fetching attractions, please try again later');
      }
    );
  }

  getAllEateries() {
    this.dataService.getAllEateries().subscribe(
      (res: any) => {
        this.eatDataList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.eat_id = e.payload.doc.id;
          this.eateriesNames.push(data.eat_name);
          return data;
        });
      },
      (err: any) => {
        alert('Error while fetching eateries, please try again later');
      }
    );
  }

  getAllEvents() {
    this.dataService.getAllEvents().subscribe(
      (res: any) => {
        this.eventDataList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.event_id = e.payload.doc.id;
          this.eventNames.push(data.event_name);
          return data;
        });
      },
      (err: any) => {
        alert('Error while fetching events, please try again later');
      }
    );
  }

  fetchAttData(): void {
    this.getAllAttractions();
  }

  fetchEateriesData(): void {
    this.getAllEateries();
  }

  fetchEventsData(): void {
    this.getAllEvents();
  }

  search(): void {
    if (this.searchQuery) {
      const tempFind = this.searchQuery.toUpperCase();
      if (tempFind === 'ATTRACTIONS' || tempFind === 'ATTRACTION') {
        this.router.navigate(['/attractions']);
      } else if (tempFind === 'THINGS TO DO' || tempFind === 'THINGS' || tempFind === 'DO') {
        this.router.navigate(['/thingstodo']);
      } else if (tempFind === 'EATERIES' || tempFind === 'EATERY' || tempFind === 'EAT') {
        this.router.navigate(['/eateries']);
      } else if (tempFind === 'EVENTS') {
        this.router.navigate(['/events']);
      } else {
        const matchingAttractions = this.attdataList.filter(attData =>
          attData.att_name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        const matchingEateries = this.eatDataList.filter(eatData =>
          eatData.eat_name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        const matchingEvents = this.eventDataList.filter(eventData =>
          eventData.event_name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );

        if (matchingAttractions.length > 0) {
          const selectedData = matchingAttractions[0];
          const { att_openHrs, att_closeHrs, att_name, att_desc, att_image, att_location } = selectedData;
          this.router.navigate(['/attraction-dashboard'], {
            state: {
              att_openHrs: att_openHrs,
              att_closeHrs: att_closeHrs,
              att_name: att_name,
              att_desc: att_desc,
              att_image: att_image,
              att_location: att_location,
              data: selectedData
            }
          });
        } else if (matchingEateries.length > 0) {
          const selectedData = matchingEateries[0];
          const { eat_openHrs, eat_closeHrs, eat_name, eat_desc, eat_image, eat_location } = selectedData;
          this.router.navigate(['/eateries-dashboard'], {
            state: {
              eat_openHrs: eat_openHrs,
              eat_closeHrs: eat_closeHrs,
              eat_name: eat_name,
              eat_desc: eat_desc,
              eat_image: eat_image,
              eat_location: eat_location,
              data: selectedData
            }
          });
        } else if (matchingEvents.length > 0) {
          const selectedData = matchingEvents[0];
          const { event_openHrs, event_closeHrs, event_name, event_desc, event_image, event_location } = selectedData;
          this.router.navigate(['/events-dashboard'], {
            state: {
              event_openHrs: event_openHrs,
              event_closeHrs: event_closeHrs,
              event_name: event_name,
              event_desc: event_desc,
              event_image: event_image,
              event_location: event_location,
              data: selectedData
            }
          });
        }
      }
    }
  }
}
