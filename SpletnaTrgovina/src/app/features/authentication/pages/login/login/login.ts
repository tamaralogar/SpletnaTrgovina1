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

export class Login 
{
  public registeredUser: User;

  constructor(private authService: AuthentificationService, private router: Router) 
  {
   this.registeredUser = new User("", "", "", "");
  }

  public onSubmit(loginForm: NgForm): void 
  {
   if (!loginForm.valid)
    {
     return;
    }

    //Observable
    this.authService.login(this.registeredUser.email, this.registeredUser.password).subscribe(
    {
      next: (response) => 
      {
        console.log('Odgovor streznika:', response);
        this.router.navigate(['/items']);
      },
      error: (err) => 
      {
        alert(err.error?.error ||"Napaka pri prijavi.");
      },
      complete: () =>
      {
        console.log('Prijava končana.');
      }
    });
  }
 
}
