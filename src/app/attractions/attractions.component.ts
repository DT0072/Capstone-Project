import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DataService } from '../shared/data.service';
import { AttData } from '../model/att-data';

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

  constructor(private auth: AuthenticationService, private dataService: DataService, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.getAllAttractions();
  }

  // Get All Attractions
  getAllAttractions() {
    this.dataService.getAllAttractions().subscribe(
      (res) => {
        this.attdataList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.att_id = e.payload.doc.id;
          return data;
        });
        this.sortData();
        this.isDataLoaded = true;
        this.displayData = this.attdataList.slice(0, this.loadedItemCount);
      },
      (err) => {
        alert('Error while fetching attractions, please try again later');
      }
    );
  }

  formatTime(time: string): string {
    const date = new Date(`2000-01-01T${time}`);
    const formattedTime = date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      hourCycle: 'h23'
    });
    return `${formattedTime}`;
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
}
