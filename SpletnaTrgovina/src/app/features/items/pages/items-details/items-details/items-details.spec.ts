

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
  @Input() item!: Item; //za items-overview
  @Input() disableToggleBasket: boolean = false; //za basket

  // If the modal is opened from the basket page, set this to false so that
  // the "Odstrani iz košarice" button is hidden inside the modal.
  @Input() showRemoveButton: boolean = true;

  @Output() basketChanged = new EventEmitter<Item>();

  constructor(private basketService: BasketService) {}

  ToggleBasket(item: Item): void {
    // ČE JE ONEMOGOČENO, SE FUNKCIJA USTAVI TUKAJ
    if (this.disableToggleBasket) {
      console.log('Spreminjanje košarice je onemogočeno.');
      return;
    }

    const alreadyIn = this.basketService.isInBasket(item);

    if (!alreadyIn) {
      this.basketService.addToBasket(item);
      item.basket = true;
    } else {
      this.basketService.removeFromBasket(item);
      item.basket = false;
    }

    this.basketChanged.emit(item);
  }
}

