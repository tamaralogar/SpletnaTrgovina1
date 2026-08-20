import { Component } from '@angular/core';

import { User } from '../../../../../shared/classes/user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../../../../shared/services/authservice'

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  public newUser: User = new User("", "", "", "")
  public confirmed: boolean = false;

  constructor(private router: Router, private authService: AuthentificationService) 
  { }

  public onSubmit(registrationForm: NgForm): void 
  {
    if (this.newUser.password !== this.newUser.confirmPassword) 
    {
      alert("Gesli se ne ujemata. Niste registrirani.");
      return;
    }

    if (!registrationForm.valid || !this.confirmed) //confirmed - checkbox: strinjanje s pogoji uporabe
    {
      return
    };

    this.authService.signup(this.newUser.email, this.newUser.password).subscribe(
    {
      next: () => 
      {
        alert("Registracija uspesna. Lahko se prijavite.");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.status === 400) 
        {
          alert("Uporabnik s tem emailom obstaja. Niste registrirani.");
        }
        else 
        {
          alert("Napaka. Niste registrirani.");
        }
      },
      complete: () => 
        {
          console.log('Registracija uspesna.');
        }
    });
  }
}