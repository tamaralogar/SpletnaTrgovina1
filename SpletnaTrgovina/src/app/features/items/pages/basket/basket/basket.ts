import { Component, Input, Output, EventEmitter} from '@angular/core';
import {Item } from '../../../../../shared/classes/item';
import { BasketService } from '../../../../../shared/services/basket';
import {Router} from '@angular/router';

@Component({
  selector: 'app-basket',
  standalone: false,
  templateUrl: './basket.html',
  styleUrl: './basket.css',
  
})
export class Basket {
  public items: Item[] = [];
  
  constructor(public basketService: BasketService
    , private router: Router
  ) { }

  ngOnInit(): void {
    this.items = this.basketService.getItems();
  }


}
