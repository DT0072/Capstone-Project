import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import  { AttData } from './att-data';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService {
  createDb(){
    const attdataObj= [
      { id: '', name: '' },
    ];
    return {attdataObj};
  }
  
  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(attdataObj: AttData[]): number {
    return attdataObj.length > 0 ? Math.max(...attdataObj.map(attdataObj => attdataObj.att_id)) + 1 : 11;
  }
}
