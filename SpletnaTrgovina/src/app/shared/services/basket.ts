import { Injectable } from '@angular/core';
import { Item } from '../classes/item';

@Injectable({
  providedIn: 'root',
})

export class BasketService {
 
  private itemsInBasket: Item[] = [];

  // Metoda za dodajanje
  addToBasket(item: Item) {
    this.itemsInBasket.push(item);
   
  }

  // Metoda za branje vseh izdelkov
  getItems() {
    return this.itemsInBasket;
  }

  // Metoda za preverjanje ali je izdelek v košarici
 isInBasket(item: Item): boolean {
    return this.itemsInBasket.some(i => i.id === item.id);
  }

  // Metoda za praznjenje
  clearBasket() {
    this.itemsInBasket = [];
    return this.itemsInBasket;
  }
  //Metoda za odstranjevanje izdelka
  removeFromBasket(item: Item) {
    const index = this.itemsInBasket.findIndex(i => i.id === item.id)
    if (index !== -1) {
      this.itemsInBasket.splice(index, 1);
    }
  }

  //Metoda za računanje skupne cene
  getTotalPrice(): number {
    let total: number = 0;
    this.itemsInBasket.forEach(item => {
      total += item.cena;
    });
    return total;
  }
}
