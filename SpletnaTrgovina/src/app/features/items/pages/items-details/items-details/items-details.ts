

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
  // Item to display in the modal
  @Input() item!: Item; // za items-overview

  // When true, ToggleBasket is disabled (used from basket modal)
  @Input() disableToggleBasket: boolean = false; // za basket

  // Controls if "Odstrani iz košarice" is shown when item is in basket
  // items-overview => true | basket => false
  @Input() showRemoveButton: boolean = true;

  @Output() basketChanged = new EventEmitter<Item>();

  constructor(private basketService: BasketService) {}

  ToggleBasket(item: Item): void {
    // If toggling is disabled (e.g. from basket modal), just exit
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

  // Use BasketService as the single source of truth for basket status
  isInBasket(item: Item): boolean {
    return this.basketService.isInBasket(item);
  }
}


