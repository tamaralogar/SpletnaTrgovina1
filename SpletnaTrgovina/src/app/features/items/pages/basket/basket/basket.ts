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
removeAndRefresh(item: Item): void {
    // 1. Najprej poiščemo modal in ga programsko zapremo
    const modalElement = document.getElementById('detailsCard' + item.id);
    
    if (modalElement) {
        // Uporabimo Bootstrap API za zapiranje
        const bootstrap = (window as any).bootstrap;
        const modalInstance = bootstrap.Modal.getInstance(modalElement) 
                           || new bootstrap.Modal(modalElement);
        
        modalInstance.hide();

        // 2. Počakamo 300ms (dolžina Bootstrap animacije), da se modal zapre
        // šele nato izbrišemo izdelek iz seznama
        setTimeout(() => {
            this.basketService.removeFromBasket(item);
            this.items = this.basketService.getItems();
            
            // Za vsak slučaj še vedno počistimo backdrop, če bi ostal
            document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
        }, 300);
    } else {
        // Če modala ni (gumb zunaj modala), takoj izbrišemo
        this.basketService.removeFromBasket(item);
        this.items = this.basketService.getItems();
    }
}

}
