import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {Item} from "../classes/item";

export interface FilterState {
  velikost: string;
  maxCena: number;
  kategorije: string[];
  barve: string[];
}

@Injectable({
  providedIn: 'root'
})

export class ItemsService {

  private filterSubject = new BehaviorSubject<FilterState>({
    velikost: "Vse velikosti",
    maxCena: 500,
    kategorije: [],
    barve: []
  });

  filters$ = this.filterSubject.asObservable();

  constructor(private http: HttpClient) { }

  getItems(filters?: FilterState): Observable<Item[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.velikost && filters.velikost !== "Vse velikosti") {
        params = params.set('velikost', filters.velikost);
      }

      if (filters.maxCena != null) {
        params = params.set('maxCena', filters.maxCena.toString());
      }

      if (filters.kategorije.length > 0) {
        params = params.set('kategorije', filters.kategorije.join(','));
      }

      if (filters.barve.length > 0) {
        params = params.set('barve', filters.barve.join(','));
      }
    }

    return this.http.get<Item[]>('/api/items', { params });
  }

  updateFilters(newFilters: FilterState) {
    this.filterSubject.next(newFilters);
  }
}
