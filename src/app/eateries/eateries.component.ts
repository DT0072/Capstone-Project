import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/data.service';
import { EatData } from '../model/eat-data';

@Component({
  selector: 'app-eateries',
  templateUrl: './eateries.component.html',
  styleUrls: ['./eateries.component.css']
})
export class EateriesComponent implements OnInit {
  eatdataList: EatData[] = [];
  displayData: EatData[] = [];
  filteredData: EatData[] = [];
  isDataLoaded: boolean = false;
  loadedItemCount: number = 4;
  itemsToLoad: number = 8;
  startIndex: number = 4;
  selectedCategories: string[] = [];
  isMenuOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getAllEateries();
  }

  getAllEateries() {
    this.dataService.getAllEateries().subscribe(
      (res: any[]) => {
        this.eatdataList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.eat_id = e.payload.doc.id;
          return data as EatData;
        });
        this.sortData();
        this.isDataLoaded = true;
        this.displayData = this.eatdataList.slice(0, this.loadedItemCount);
      },
      (err: any) => {
        alert('Error while fetching eateries, please try again later');
      }
    );
  }

  formatTime(time: string): string {
    // Convert the time string to a JavaScript Date object
    const date = new Date(`2000-01-01T${time}`);

    // Format the time using options for hour12 and hourCycle
    const formattedTime = date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      hourCycle: 'h23'
    });

    return `${formattedTime}`;
  }

  sortData() {
    this.eatdataList.sort((a, b) => {
      return a.eat_name.localeCompare(b.eat_name);
    });
  }

  showMore() {
    if (!this.isDataLoaded) {
      return;
    }
    const remainingData = this.eatdataList.slice(this.startIndex);
    const newData = remainingData.slice(0, this.itemsToLoad);
    this.displayData = [...this.displayData, ...newData];
    this.startIndex += this.itemsToLoad;
  }
}
