import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './user';
import { AttData } from './att-data';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  // Add User
  addUser(user: User){
    user.id = this.afs.createId();
    return this.afs.collection('users').add(user.id);
  }

  // Get All Users
  getAllUsers(){
    return this.afs.collection('users').snapshotChanges();
  }

  // Delete User
  deleteUser(user: User){
    return this.afs.doc('/users/' + user.id).delete();
  }

  // Update User
  updateUser(user: User){
    this.deleteUser(user);
    this.addUser(user);
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
