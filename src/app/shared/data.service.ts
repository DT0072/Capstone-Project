import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AttData } from '../model/att-data';
import { Eateries } from '../model/eateries';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  // Add Attractions
  addAttraction(attdata: AttData) {
    attdata.att_id = this.afs.createId();
    return this.afs.collection('/attdatas').add(attdata);
  }

  // Get Attractions
  getAllAttractions() {
    return this.afs.collection('/attdatas').snapshotChanges();
  }

  // Get Attraction by ID
  // getAttractionById(att_id: string) {
  //   return this.afs.doc('/attractions/'+ att_id).valueChanges();
  // }

  // Delete Attraction
  deleteAttraction(attdata: AttData) {
    return this.afs.doc('/attdatas/'+ attdata.att_id).delete();
  }

  // Update Attraction 
  updateAttraction(attdata: AttData) {
    this.deleteAttraction(attdata);
    this.addAttraction(attdata);
  }

  // Add Eateries
  addEateries(eateries: Eateries) {
    eateries.eat_id = this.afs.createId();
    return this.afs.collection('/eateriesdatas').add(eateries);
  }

  // Get Eateries
  getAllEateries() {
    return this.afs.collection('/eateriesdatas').snapshotChanges();
  }

  // Delete Eateries
  deleteEateries(eateries: Eateries) {
    return this.afs.doc('/eateriesdatas/'+ eateries.eat_id).delete();
  }

  // Update Eateries 
  updateEateries(eateries: Eateries) {
    this.deleteEateries(eateries);
    this.addEateries(eateries);
  }
}
