import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { DataService } from '../data.service';
import { AttData } from '../att-data';
import { Data } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  attdataList: AttData[] = [];
  attdataObj: AttData = {
    att_id: parseInt(''),
    att_name: '',
    att_desc: '',
    att_openHrs: '',
    att_price: '',
  };
  att_id: number = parseInt('');
  att_name: string= '';
  att_desc: string= '';
  att_openHrs: string= '';
  att_closeHrs: string= '';
  att_price: string= '';

  constructor(private auth: AuthenticationService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  register(){
    this.auth.logout()
  }

  getAllData(){
    this.data.getAllData().subscribe((response: any) => {
      this.attdataList = response.map((data: any) => {
        return {
          ...data.payload.doc.data()
        } as AttData;
      })
    })
  }

  resetForm(){
    this.att_id= 0;
    this.att_name=  '';
    this.att_desc= '';
    this.att_openHrs= '';
    this.att_closeHrs= '';
    this.att_price= '';
  }

  addData(){
    if(this.att_name == '' || this.att_desc == '' || this.att_openHrs == '' ||this.att_closeHrs == '' || this.att_price == ''){
      alert('Please fill in all the fields');
      return;
    }

    this.attdataObj.att_name= this.att_name;
    this.attdataObj.att_desc= this.att_desc;
    this.attdataObj.att_openHrs= this.att_openHrs;
    this.attdataObj.att_price= this.att_price;


    this.data.addData(this.attdataObj);
    this.resetForm();
  }

  updateData(){

  }

  deleteData(attdataObj: AttData){
    if(window.confirm('Are you sure you want to delete '+ attdataObj.att_name + '?')){
      this.data.deleteData(attdataObj);
    }
  }

}
