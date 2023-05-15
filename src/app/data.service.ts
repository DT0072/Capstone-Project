import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Admin } from './admin';
import { AttData } from './att-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  // Add Admin
  addAdmin(admin: Admin){
    admin.first_name = this.afs.createId();
    return this.afs.collection('admins').add(admin);
  }

  // Get All Admin
  getAllAdmins(){
    return this.afs.collection('admins').snapshotChanges();
  }

  // Delete Admin
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
    attdataObj.att_name = this.afs.createId();
    return this.afs.collection('attdata').add(attdataObj.att_name);
  }

  // Get All Data
  getAllData(){
    return this.afs.collection('attdata').snapshotChanges();
  }

  // Delete Data
  deleteData(attdataObj: AttData){
    return this.afs.doc('/attdata/' + attdataObj.att_name).delete();
  }

  // Update Data
  updateData(attdataObj: AttData){
    this.deleteData(attdataObj);
    this.addData(attdataObj);
  }
}
