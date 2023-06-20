import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AttData } from './model/att-data';
import { EatData } from './model/eat-data';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {
  private attractionsBaseUrl = 'http://localhost:4200/api/attractions';
  private eateriesBaseUrl = 'http://localhost:4200/api/eateries';

  constructor(private http: HttpClient) { }

  getAllAttractions(attractionName: string): Observable<AttData[]> {
    const url = `${this.attractionsBaseUrl}/search?name=${attractionName}`;
    return this.http.get<AttData[]>(url);
  }
  
  
  getAllEateries(fullName: string): Observable<EatData> {
    const url = `${this.eateriesBaseUrl}/search?name=${fullName}`;
    return this.http.get<EatData>(url);
  }
}
