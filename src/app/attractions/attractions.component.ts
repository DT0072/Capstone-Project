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
  filteredData: AttData[] = [];
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
        this.filteredData = this.attdataList;
        this.loadedItemCount = 4; 
        this.displayData = this.filteredData.slice(0, this.loadedItemCount);
      },
      (err: any) => {
        alert('Error while fetching attractions, please try again later');
      }
    );
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
    this.attdataList.sort((a, b) => {
      return a.att_name.localeCompare(b.att_name);
    });
  }

  redirectToAttractionDashboardComponent(attdata: AttData): void {
    const { att_id, att_name, att_desc, att_openHrs, att_closeHrs, att_price,att_location } = attdata;
    this.router.navigate(['/attraction-dashboard'], {
      state: {
        att_id,
        att_name,
        att_desc,
        att_openHrs,
        att_closeHrs,
        att_price,
        att_location
      }
    });
  }

  filterAttractions(event: any) {
    const checkbox = event.target;
    const categoryName = checkbox.name;
  
    if (checkbox.checked) {
      this.selectedCategories.push(categoryName);
    } else {
      const index = this.selectedCategories.indexOf(categoryName);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
  
    this.applyFilters();
  }

  applyFilters() {
    if (this.selectedCategories.length > 0) {
      this.filteredData = this.attdataList.filter((attdata) => {
        return this.selectedCategories.some((category) => attdata.att_location.includes(category));
      });
    } else {
      this.filteredData = this.attdataList;
    }

    this.displayData = this.filteredData.slice(0, this.loadedItemCount);
    this.startIndex = this.loadedItemCount;
  }
  
  isFilterMenuOpen: boolean = false;

  toggleFilterMenu() {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
  }

}
