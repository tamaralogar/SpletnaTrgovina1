import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  
  public isLoggedIn(){
    return true //Tu morem dodat funkcijo. Ideja: povezava z login, če uporabnik vnese pravilno uporabniško ime in geslo je tru drugače false
  }
}
