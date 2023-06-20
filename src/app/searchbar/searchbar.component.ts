import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchbarService } from '../searchbar.service';
import { AttData } from '../model/att-data';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  searchQuery: string = '';
  attdataList: AttData[] = [];

  constructor(private router: Router, private searchbarService: SearchbarService) { }

  search(): void {
    if (this.searchQuery) {
      const tempFind = this.searchQuery.toUpperCase();
      if (tempFind === 'ATTRACTIONS') {
        this.router.navigate(['/attractions']);
      } else if (tempFind === 'THINGS TO DO') {
        this.router.navigate(['/thingstodo']);
      } else if (tempFind === 'EATERIES') {
        this.router.navigate(['/eateries']);
      } else if (tempFind === 'EVENTS') {
        this.router.navigate(['/events']);
      } else {
        this.searchbarService.getAllAttractions(this.searchQuery)
          .subscribe(
            attdataList => {
              if (attdataList.length > 0) {
                this.attdataList = attdataList; // Assign retrieved attractions to the property
                const att_name = attdataList[0]; // Assuming you want to navigate to the first matching attraction
                this.router.navigate(['/attractions', att_name]);
              } else {
                this.router.navigate(['/search-not-found']);
              }
            },
            error => {
              console.error('Error:', error);
              // Handle error and display appropriate message
            }
          );
      }
    }
  }
}
