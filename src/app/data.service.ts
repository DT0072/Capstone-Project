import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Admin } from './admin';
import { AttData } from './att-data';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  // Add User
  addAdmin(admin: Admin){
    admin.id = this.afs.createId();
    return this.afs.collection('admins').add(admin);
  }

  // Get All Users
  getAllAdmins(){
    return this.afs.collection('admins').snapshotChanges();
  }

  // Delete User
  deleteAdmin(admin: Admin){
    return this.afs.doc('/admins/' + admin.id).delete();
  }

  // Update User
  updateAdmin(admin: Admin){
    this.deleteAdmin(admin);
    this.addAdmin(admin);
  }

  // Add Data
  addData(attdataObj: AttData){
    attdataObj.att_id = this.afs.createId();
    return this.afs.collection('attdata').add(attdataObj.att_id);
  }

  // Get All Data
  getAllData(){
    return this.afs.collection('attdata').snapshotChanges();
  }

  // Delete Data
  deleteData(attdataObj: AttData){
    return this.afs.doc('/attdata/' + attdataObj.att_id).delete();
  }

  // Update Data
  updateData(attdataObj: AttData){
    this.deleteData(attdataObj);
    this.addData(attdataObj);
  }
}
