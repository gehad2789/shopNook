import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';

export interface Company {
  name: string;
  address: string;
  phones: string[];
  emails: string[];
  offers: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private jsonUrl = 'assets/Apis/companies.json'; // Path to the JSON file

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<{ companies: Company[] }> {
    return this.http.get<{ companies: Company[] }>(this.jsonUrl);
  }




  //search bar
}