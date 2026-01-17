

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../../../../shared/classes/item';
import { BasketService } from '../../../../../shared/services/basket';

@Component({
  selector: 'app-items-details',
  standalone: false,
  templateUrl: './items-details.html',
  styleUrl: './items-details.css',
})
export class ItemsDetails {
 
  @Input() item!: Item; // za items-overview --> katerega naj odpre v modal

  @Input() disableToggleBasket: boolean = false; // za basket

  @Input() showRemoveButton: boolean = true; //za basket, da ko je item v basketu ne dela gumb na modal odstrani iz košarice

  @Output() basketChanged = new EventEmitter<Item>();

  constructor(private basketService: BasketService) {}

  ToggleBasket(item: Item): void {
    
    if (this.disableToggleBasket) {
      console.log('Spreminjanje košarice je onemogočeno.');
      return;
    }

    const alreadyIn = this.basketService.isInBasket(item);
    //spreminjanje ali je v kočarici ali ne
    if (!alreadyIn) {
      this.basketService.addToBasket(item);
      item.basket = true;
    } else {
      this.basketService.removeFromBasket(item);
      item.basket = false;
    }

    this.basketChanged.emit(item);
  }

  // Use BasketService as the single source of truth for basket status
  isInBasket(item: Item): boolean {
    return this.basketService.isInBasket(item);
  }
}


