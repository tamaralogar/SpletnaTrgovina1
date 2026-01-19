
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Item } from '../../../../../shared/classes/item';
//import jsonitems from '../../../../../../../public/assets/items.json';
import { BasketService } from '../../../../../shared/services/basket';
import { ItemsService } from '../../../../../shared/services/itemsservice';


@Component({
  selector: 'app-items-overview',
  standalone: false,
  templateUrl: './items-overview.html',
  styleUrl: './items-overview.css',
})
export class ItemsOverview implements OnInit {
  public items: Item[] = [];

  constructor(private basketService: BasketService, private itemsService: ItemsService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadItems();
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


  private loadItems() {
    console.log('Nalagam artikle...');
    this.itemsService.getItems().subscribe((data) => {
      this.items = data.map((jsonItem) => {
        const isCurrentlyInBasket = this.basketService.isInBasket({ id: jsonItem.id } as Item); //da nastavi ali je item v košarici ali ne

        return new Item(
          jsonItem.id,
          jsonItem.naziv || '',
          jsonItem.cena || 0,
          jsonItem.slika || '',
          jsonItem.opis || '',
          jsonItem.velikost || '',
          jsonItem.barva || '',
          isCurrentlyInBasket
        );

      });

      this.cdr.detectChanges(); //posodobi-da se naložijo izdelki

  });
  }
}
