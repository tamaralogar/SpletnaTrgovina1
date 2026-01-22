import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>('/api/items');
  }

  updateFilters(newFilters: FilterState) {
    this.filterSubject.next(newFilters);
  }
}
