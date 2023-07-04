import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttData } from '../model/att-data';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-thingstodo',
  templateUrl: './thingstodo.component.html',
  styleUrls: ['./thingstodo.component.css']
})
export class ThingstodoComponent implements OnInit {
  attdataList: AttData[] = [];
  displayData: AttData[] = [];
 
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
  
        this.displayData = this.attdataList.filter((attData: AttData) => {
          return attData.att_price != '-';
        });
  
        this.sortData(); 
      },
      (err: any) => {
        alert('Error while fetching attractions, please try again later');
      }
    );
  }
  

  formatTime(time: string): string {
    if (time === '24 Hours') {
      return time;
    } else if (time === '-' || !time) {
      return '';
    } else {
      const date = new Date(`2000-01-01T${time}`);
      const formattedTime = date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        hourCycle: 'h23'
      });
      return formattedTime;
    }
  }

  sortData() {
    this.displayData.sort((a, b) => {
      return a.att_name.localeCompare(b.att_name);
    });
  }

  redirectToBookingDetailsComponent(attdata: AttData): void {
    const { att_id, att_name, att_image, att_desc, att_openHrs, att_closeHrs, att_price, att_location } = attdata;  
    this.router.navigate(['/booking-details'], {
      state: {
        att_id,
        att_name,
        att_image,
        att_desc,
        att_openHrs,
        att_closeHrs,
        att_price,
        att_location
      }
    });
  }

  redirectToAttractionDashboardComponent(attdata: AttData): void {
    const { att_id, att_name,att_image, att_desc, att_openHrs, att_closeHrs, att_price, att_location } = attdata;
    this.router.navigate(['/attraction-dashboard'], {
      state: {
        att_id,
        att_name,
        att_image,
        att_desc,
        att_openHrs,
        att_closeHrs,
        att_price,
        att_location
      }
    });
  }
  
}
