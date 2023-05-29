import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DataService } from '../shared/data.service';
import { AttData } from '../model/att-data';
import { Data } from '@angular/router';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.css']
})
export class AttractionsComponent {
    attdataList: AttData[] = [];
    attdataObj: AttData= {
      att_id: '',
      att_name: '',
      att_desc: '',
      att_openHrs: '',
      att_closeHrs: '',
      att_price: ''
    };
    att_id: string= '';
    att_name: string= '';
    att_desc: string= '';
    att_openHrs: string= '';
    att_closeHrs: string= '';
    att_price: string= '';
  
    constructor(private auth: AuthenticationService, private data: DataService, private afAuth: AngularFireAuth) {}
  
    ngOnInit(): void {
      this.getAllAttractions();
    }

    // Get All Attractions
  getAllAttractions() {
    this.data.getAllAttractions().subscribe(res => {
      this.attdataList= res.map( (e: any) => {
        const data= e.payload.doc.data();
        data.att_id= e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error while fetching attractions, please try again later');
    })
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

}
