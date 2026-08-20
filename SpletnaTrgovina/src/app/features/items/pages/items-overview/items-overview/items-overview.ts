
import { Component, OnInit} from '@angular/core';

import { Item } from '../../../../../shared/classes/item';
import { BasketService } from '../../../../../shared/services/basket';
import { ItemsService } from '../../../../../shared/services/itemsservice';
import { Observable, switchMap} from 'rxjs';

@Component({
  selector: 'app-items-overview',
  standalone: false,
  templateUrl: './items-overview.html',
  styleUrl: './items-overview.css',
})

export class ItemsOverview implements OnInit {
  
  items$!: Observable<Item[]>;

  
  constructor(
    private basketService: BasketService, 
    private itemsService: ItemsService, 
  ) { }

  ngOnInit(): void {
    this.items$ = this.itemsService.filters$.pipe(
      switchMap(filters => this.itemsService.getItems(filters))
    );
  }

  ToggleBasket(item: Item): void {
    const alreadyIn = this.basketService.isInBasket(item);

    // Če je item že v kočarici, da ga po vrnitvi iz košarice ne moremo še enkrat dodat vanjo 
    if (!alreadyIn) {
      this.basketService.addToBasket(item);
      item.basket = true;
    } else {
      this.basketService.removeFromBasket(item);
      item.basket = false;
    }

    console.log('BASKET status za ' + item.naziv + ': ' + item.basket);
  }
}