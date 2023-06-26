import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttData } from '../model/att-data';
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
  attNames: string[] = [];

  constructor(
    private router: Router,
    private searchbarService: SearchbarService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.fetchAttData();
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

  fetchAttData(): void {
    this.getAllAttractions();
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
        const matchingAttractions = this.attdataList.filter(attData => attData.att_name.toLowerCase().includes(this.searchQuery.toLowerCase()));
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
        }
      }
    }
  }

}
