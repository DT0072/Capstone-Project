import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Admin } from './admin';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  constructor(private http: HttpClient) {}
}
