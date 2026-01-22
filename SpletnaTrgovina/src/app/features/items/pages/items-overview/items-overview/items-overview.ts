
import { Component, signal, computed, OnInit, ChangeDetectorRef } from '@angular/core';

import { Item } from '../../../../../shared/classes/item';
//import jsonitems from '../../../../../../../public/assets/items.json';
import { BasketService } from '../../../../../shared/services/basket';
import { ItemsService } from '../../../../../shared/services/itemsservice';
import { Observable, map, combineLatest } from 'rxjs';


const KATEGORIJE_MAP: { [key: string]: string[] } = {
  "Majice": ["majica", "Majica"],
  "Hlace": ["hlače", "Hlače"],
  "Krila": ["krilo", "Krilo"],
  "Obleke": ["Obleka", "obleka"],
  "Jakne": ["Jakna", "jakna"]
};

const BARVE_MAP: { [key: string]: string[] } = {
  "Rdeca": ["Rdeča", "rdeča", "rdeč", "rdečo", "Rdeč", "Rdečo"],
  "Modra": ["Modra", "modra"],
  "Zelena": ["Zelena", "zelena"],
  "Bela": ["Bela", "bela"],
  "Crna": ["črna", "Črna", "Črn", "črn"]
};

@Component({
  selector: 'app-items-overview',
  standalone: false,
  templateUrl: './items-overview.html',
  styleUrl: './items-overview.css',
})



export class ItemsOverview implements OnInit {
  public items: Item[] = [];

  

  constructor(private basketService: BasketService, private itemsService: ItemsService, private cdr: ChangeDetectorRef) { }

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

  items$!: Observable<Item[]>;

    ngOnInit(): void {
  this.items$ = combineLatest([
    this.itemsService.getItems(),
    this.itemsService.filters$
  ]).pipe(
    map(([items, filters]) => {
      return items.filter(item => {
        
        const matchSize = filters.velikost === 'Vse velikosti' || item.velikost === filters.velikost;
        const matchPrice = item.cena <= filters.maxCena;
        const matchCat = filters.kategorije.length === 0 || filters.kategorije.some(izbranaKat => {
          const kljucneBesedeKat = KATEGORIJE_MAP[izbranaKat] || [izbranaKat];
          return kljucneBesedeKat.some(beseda => item.naziv.toLowerCase() === beseda.toLowerCase());
        });

        const matchColor = filters.barve.length === 0 || filters.barve.some(izbranaBarva => {
          const kljucneBesedeBarva = BARVE_MAP[izbranaBarva] || [izbranaBarva];
          return kljucneBesedeBarva.some(beseda => item.barva.toLowerCase() === beseda.toLowerCase());
        });

        return matchSize && matchPrice && matchCat && matchColor;
      });
    })
  );
}

  /*private loadItems() {
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
  }*/
}
