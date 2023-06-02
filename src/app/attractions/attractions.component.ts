import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttData } from '../model/att-data';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.css']
})
export class AttractionsComponent implements OnInit {
  attdataList: AttData[] = [];
  displayData: AttData[] = [];
  isDataLoaded: boolean = false;
  loadedItemCount: number = 4;
  itemsToLoad: number = 8;
  startIndex: number = 4;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getAllAttractions();
  }

  getAllAttractions() {
    this.dataService.getAllAttractions().subscribe(
      (res: any) => {
        this.attdataList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.att_id = e.payload.doc.id;
          return data;
        });
        this.sortData();
        this.isDataLoaded = true;
        this.displayData = this.attdataList.slice(0, this.loadedItemCount);
      },
      (err: any) => {
        alert('Error while fetching attractions, please try again later');
      }
    );
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
  
  showMore() {
    if (!this.isDataLoaded) {
      return;
    }
    const remainingData = this.attdataList.slice(this.startIndex);
    const newData = remainingData.slice(0, this.itemsToLoad);
    this.displayData = [...this.displayData, ...newData];
    this.startIndex += this.itemsToLoad;
  }

  sortData() {
    this.attdataList.sort((a, b) => {
      return a.att_name.localeCompare(b.att_name);
    });
  }

  redirectToAttractionDashboardComponent(attdata: AttData): void {
    console.log('Data being passed:', attdata);
    const { att_id, att_name, att_desc, att_openHrs, att_closeHrs, att_price } = attdata;
    this.router.navigate(['/attraction-dashboard'], {
      state: {
        att_id,
        att_name,
        att_desc,
        att_openHrs,
        att_closeHrs,
        att_price
      }
    });
  }
  
}
