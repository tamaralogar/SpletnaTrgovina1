import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {

  constructor(private http: HttpClient) { }


  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>('/api/login', { email, password }).pipe(
      tap(response => {
        // uspešna prijava
          localStorage.setItem('jwtToken', response.token);
          localStorage.setItem('userEmail', response.email);
      })
    );
  }

  public signup(email: string, password: string): Observable<any> {
    return this.http.post<any>('/api/signup', { email, password});
  }

  public getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }
  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();

      if (isExpired) {
        this.logout();
        return false;
      }

      return true;
    } 
    
    catch {
      return false;
    }
  }

  public logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userEmail');
  }
}
