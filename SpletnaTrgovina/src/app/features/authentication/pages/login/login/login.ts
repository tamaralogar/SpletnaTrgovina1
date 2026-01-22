import { Component, ChangeDetectorRef, NgZone } from '@angular/core';

import { User } from '../../../../../shared/classes/user';
import { NgForm } from '@angular/forms';
import { AuthentificationService } from '../../../../../shared/services/authservice';
import { Router } from '@angular/router';
import { Subject, switchMap, catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})



export class Login {

  private login$ = new Subject<{ email: string, password: string }>();
  public registeredUser : User = new User("", "", "", "")

  readonly authAction$ = this.login$.pipe(
    switchMap(user =>
      this.authService.login(user.email, user.password).pipe(
        // Uspešna pot
        tap(response => {
          console.log('Prijava uspela:', response);
          this.router.navigate(['/items']);
        }),
        // Napaka na poti
        catchError(err => {
          alert(err.error?.message || "Napaka!");
          return of(null);
        })
      )
    )
  );

  constructor(private authService: AuthentificationService, private router: Router) {
    // To "oživi" observable za celoten čas komponente
    this.authAction$.subscribe();
  }

  public onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      this.login$.next({
        email: this.registeredUser.email,
        password: this.registeredUser.password
      });
    }
  }
  }

/* public registeredUser: User;


 constructor(private authService: AuthentificationService, private router: Router, private cdr: ChangeDetectorRef, private ngZone: NgZone) {
   this.registeredUser = new User("", "", "", "");

 }

 public onSubmit(loginForm: NgForm): void {

   if (loginForm.valid) {

     this.authService.login(this.registeredUser.email, this.registeredUser.password).subscribe({
       next: (response) => {
         console.log('Odgovor strežnika:', response);
         
         if (response.token) {
           localStorage.setItem('token', response.token);
         }

         this.ngZone.run(() => {
           this.router.navigate(["/items"]).then(() => {
             this.cdr.detectChanges();
           });
         });
       },
       error: (err) => {
         if (err.status === 401) {  //  če interceptor vrne 401
           alert("Napačen email ali geslo!");
         } else {
           alert("Prišlo je do napake pri prijavi.");
         }
         this.cdr.detectChanges();
       }
     });
   }
 }
}*/
