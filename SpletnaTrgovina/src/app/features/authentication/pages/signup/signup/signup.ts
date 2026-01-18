import { Component } from '@angular/core';

import { User } from '../../../../../shared/classes/user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthentificationService} from '../../../../../shared/services/authservice'

@Component({
  selector: 'app-signup',
  standalone: false, 
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  public newUser: User;
  public confirmed: boolean = false;

  constructor(private router : Router, private authService : AuthentificationService) {
    this.newUser = new User("", "", "", "");
   }

public onSubmit(registrationForm: NgForm): void {

    if (this.confirmed && this.newUser.password === this.newUser.confirmPassword && registrationForm.valid) {
      //Izpis ali je registracija uspešna ali ne
    let text = `Uspešno ste se registrirali: ${this.newUser.username} z e-poštnim naslovom: ${this.newUser.email} in geslom: ${this.newUser.password}`;
    alert(text);
    console.log(text);
    } else {
        alert("Gesli se ne ujemata. Niste registrirani");
        console.log("Gesli se ne ujemata. Niste registrirani");
      }


//Tukaj še dodaj!!!

  }





}
