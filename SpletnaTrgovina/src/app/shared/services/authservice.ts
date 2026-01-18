import { Injectable } from '@angular/core';
/*import { HttpClient } from '@angular/common/http'; 
import {Observable} from 'rxjs';
import { tap } from 'rxjs/operators';*/ //za dejanski token 

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  

  public login(email: string, password: string) : boolean
  {
    if (email === "tamara" && password === "123" )
    {
      const fakeToken = 'Losing my mind';
      localStorage.setItem('jwtToken', fakeToken);
      localStorage.setItem('userEmail', email);
      return true;
    }
    return false;
  }

  public getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }
  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

   public isLoggedIn(): boolean {
    return !!this.getToken();
    
  }

   public logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userEmail');
  }
}
