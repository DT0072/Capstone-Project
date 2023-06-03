import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AttData } from '../model/att-data';
import { EatData } from '../model/eat-data';

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
  addEateries(eatdata: EatData) {
    eatdata.eat_id = this.afs.createId();
    return this.afs.collection('/eateriesdatas').add(eatdata);
  }

  // Get Eateries
  getAllEateries() {
    return this.afs.collection('/eateriesdatas').snapshotChanges();
  }

  // Delete Eateries
  deleteEateries(eatdata: EatData) {
    return this.afs.doc('/eateriesdatas/'+ eatdata.eat_id).delete();
  }

  // Update Eateries 
  updateEateries(eatdata: EatData) {
    this.deleteEateries(eatdata);
    this.addEateries(eatdata);
  }
}
