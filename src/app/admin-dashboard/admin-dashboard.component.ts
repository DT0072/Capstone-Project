import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { AttData } from '../model/att-data';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  attdataList: AttData[] = [];
  att_id: string= '';
  att_name: string= '';
  att_desc: string= '';
  att_openHrs: string= '';
  att_price: string= '';

  constructor(private auth: AuthenticationService, private data: DataService) {}

  ngOnInit(): void {}

  register() {
    this.auth.logout();
  }

  getAttractions() {
    this.data.getAllAttractions().subscribe(res => {
      this.attdataList = res.map((e: any) => {
        const data= e.payload.doc.data();
        data.att_id= e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching attractions'); 
    })
  }

  addAttraction() {
    
  }

  updateAttraction() {

  }

  deleteAttraction(attdata: AttData) {
    if(window.confirm('Are you sure you want to delete this attraction?' + this.att_name + '?' )){
    this.data.deleteAttraction(attdata);
    }
  }
}
