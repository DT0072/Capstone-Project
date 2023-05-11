import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './user';

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
}
