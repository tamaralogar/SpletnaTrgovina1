import { Component, ChangeDetectorRef, NgZone } from '@angular/core';

import { User } from '../../../../../shared/classes/user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../../../../shared/services/authservice'
import { Subject, switchMap, tap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  public newUser: User = new User("", "", "", "")
  public confirmed: boolean = false;

  private signup$ = new Subject<User>();

  readonly signupAction$ = this.signup$.pipe(
    switchMap(user =>
      this.authService.signup(user.email, user.password).pipe(
        tap(() => {
          alert("Uspešno ste se registrirali.");
          this.ngZone.run(() => {
            this.router.navigate(['/login']);
          });
        }),
        catchError(err => {
          if (err.status === 400) {
            alert("Uporabnik s tem e-naslovom je že registriran!");
          } else {
            alert("Prišlo je do napake pri registraciji.");
          }
          return of(null); // da se ne ustavi ob napaki
        })
      )
    )
  );

  constructor(private router: Router, private authService: AuthentificationService, private cdr: ChangeDetectorRef, private ngZone: NgZone) {
    this.signupAction$.subscribe();
  }

  public onSubmit(registrationForm: NgForm): void {

    if (this.newUser.password !== this.newUser.confirmPassword) {
      alert("Gesli se ne ujemata. Niste registrirani.");
      return;
    }

    if (registrationForm.valid && this.confirmed) {
      this.signup$.next(this.newUser);

    };
  }
}




