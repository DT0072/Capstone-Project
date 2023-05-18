import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AttData } from '../model/att-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  // Add Attractions
  addAttraction(attdata: AttData) {
    attdata.att_id = this.afs.createId();
    return this.afs.collection('/attractions').add(attdata);
  }

  // Get Attractions
  getAllAttractions() {
    return this.afs.collection('/attractions').snapshotChanges();
  }

  // Get Attraction by ID
  getAttractionById(att_id: string) {
    return this.afs.doc('/attractions/'+ att_id).valueChanges();
  }

  // Delete Attraction
  deleteAttraction(attdata: AttData) {
    return this.afs.doc('/attractions/'+ attdata.att_id).delete();
  }

  // Update Attraction
  updateAttraction(attdata: AttData) {
    this.deleteAttraction(attdata);
    this.addAttraction(attdata);
  }
}
