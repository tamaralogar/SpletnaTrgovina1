import { Component } from '@angular/core';

import { User } from '../../../../../shared/classes/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  public oldUser: User;
  public oldUserPassword: string ;

  constructor() {
    this.oldUser = new User("", "","", "");
    this.oldUserPassword = "";
   }

   public onSubmit(loginForm: NgForm): void {

    if (loginForm.valid) {
    let text = `Uspešno ste se prijavili.`;
    alert(text);
    console.log(text);
    } else {
        alert("Napaka pri prijavi.");
        console.log("Napaka pri prijavi.");
      }
  }
}
