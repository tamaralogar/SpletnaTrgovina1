import { Component, ChangeDetectorRef, NgZone } from '@angular/core';

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

  constructor(private router : Router, private authService : AuthentificationService, private cdr : ChangeDetectorRef, private ngZone : NgZone) {
    this.newUser = new User("", "", "", "");
   }

public onSubmit(registrationForm: NgForm): void {

    if (this.newUser.password !== this.newUser.confirmPassword) {
      alert ("Gesli se ne ujemata. Niste registrirani.");
      return;
    }

  if (registrationForm.valid && this.confirmed) {
      
      this.authService.signup(this.newUser.email, this.newUser.password).subscribe({
        next: (response) => {
          alert("Uspešno ste se registrirali.");
          
          this.ngZone.run(() => {
            this.router.navigate(['/login']).then(() => {
              this.cdr.detectChanges();
            });
          });
        },
        error: (err) => {
          if (err.status === 400) {
            alert("Uporabnik s tem e-naslovom je že registriran!");
          } else {
            alert("Prišlo je do napake pri registraciji.");
          }
          this.cdr.detectChanges();
        }
      });
    }
  }
}



