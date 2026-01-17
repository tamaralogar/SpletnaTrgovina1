import { Component } from '@angular/core';
import { BasketService } from '../../../../shared/services/basket'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  constructor(private basketService: BasketService, private router: Router) {}

  koncajNakup() : void {
    this.basketService.clearBasket();

    this.router.navigate(['/items']);
  }

}
