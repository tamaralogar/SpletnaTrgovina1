import { Component } from '@angular/core';
import { AuthentificationService } from '../../../services/authservice';
import { ItemsService } from '../../../services/itemsservice';
import { Router } from '@angular/router'


@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  public filterModel = {
    velikost: 'Vse velikosti',
    maxCena: 500,
    kategorije: {
      Majice: false,
      Hlace: false,
      Krila: false,
      Obleke: false,
      Jakne: false
    },
    barve: {
      Rdeca: false,
      Modra: false,
      Zelena: false,
      Bela: false,
      Crna: false
    }
  };


  constructor(private authService: AuthentificationService, private router: Router, private itemsService: ItemsService) {
  }


  public applyFilters() {
    
    const selectedCats = Object.keys(this.filterModel.kategorije)
      .filter(key => (this.filterModel.kategorije as any)[key]); //naredi seznam, kjer je izbrana vredost kategorije = true

    const selectedColors = Object.keys(this.filterModel.barve)
      .filter(key => (this.filterModel.barve as any)[key]); //naredi seznam, kjer je izbrana vredost barve = true

    this.itemsService.updateFilters({
      velikost: this.filterModel.velikost,
      maxCena: this.filterModel.maxCena,
      kategorije: selectedCats,
      barve: selectedColors
    });
  }


  public logMeOut() {

    console.log("Odjava")
    this.authService.logout()
    this.router.navigate(["/login"])
  }

}


