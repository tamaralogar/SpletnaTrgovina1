import { Component } from '@angular/core';

import { User } from '../../../../../shared/classes/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  public newUser: User;
  public confirmed: boolean = false;

  constructor() {
    this.newUser = new User("", "", "", "");
   }

public onSubmit(registrationForm: NgForm): void {

    if (this.confirmed && this.newUser.password === this.newUser.confirmPassword && registrationForm.valid) {
    let text = `Uspešno ste se registrirali: ${this.newUser.username} z e-poštnim naslovom: ${this.newUser.email} in geslom: ${this.newUser.password}`;
    alert(text);
    console.log(text);
    } else {
        alert("Gesli se ne ujemata.");
        console.log("Gesli se ne ujemata.");
      }
  }
}
