import { Component } from '@angular/core';

import { User } from '../../../../../shared/classes/user';
import { NgForm } from '@angular/forms';
import { AuthentificationService } from '../../../../../shared/services/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  public oldUser: User;
 

  constructor(private authService : AuthentificationService, private router: Router) {
    this.oldUser = new User("", "","", "");
    
   }

   public onSubmit(loginForm: NgForm): void {

    if (loginForm.valid) {
    
      //token
      const loginSuccess = this.authService.login (this.oldUser.email, this.oldUser.password);
      
      if (loginSuccess) {
         alert("Uspešno ste se prijavili.");
      } else  if (this.oldUser.email !== "tamara"){
          alert("Uporabnik ni registriran!")
      }else{
          alert("Napačno geslo!")
      }
      
      this.router.navigate(["/items"])

      }

    } 
  
}
