import { Injectable } from '@angular/core';
import { Item } from '../classes/item';

@Injectable({
  providedIn: 'root',
})

export class BasketService {
 
  private itemsInBasket: Item[] = [];

  // Dodajanje
  addToBasket(item: Item) {
    this.itemsInBasket.push(item);
   
  }
  getItems() {
    return this.itemsInBasket;
  }

  // Ali je item v košarici
 isInBasket(item: Item): boolean {
    return this.itemsInBasket.some(i => i.id === item.id);
  }

  //Sprazne košarico
  clearBasket() {
    this.itemsInBasket = [];
    return this.itemsInBasket;
  }
  //Odstrani določen item
  removeFromBasket(item: Item) {
    const index = this.itemsInBasket.findIndex(i => i.id === item.id)
    if (index !== -1) {
      this.itemsInBasket.splice(index, 1);
    }
  }

  //Računanje skupne cene
  getTotalPrice(): number {
    let total: number = 0;
    this.itemsInBasket.forEach(item => {
      total += item.cena;
    });
    return total;
  }
}
