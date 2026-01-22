import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs'; //za observable
import { delay } from 'rxjs/operators'; //stimulacija nalaganja-čakanje da se pridobijo podatki
import itemsData from '../../../public/assets/items.json';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { AuthentificationService } from '../shared/services/authservice';

@Injectable({
  providedIn: 'root',
})

export class Interceptor {

}


//mockUsers-kot da bi bili že registrirani

const mockUsers = [
  { email: 'test@gmail.com', password: '123' },
  { email: 'admin@gmail.com', password: 'geslo' }
];



//mockInterceptor od tu naprej
export const mockInterceptor: HttpInterceptorFn = (req, next) => {
  
const authService = inject(AuthentificationService);

  //login
  if (req.url.includes('/api/login') && req.method === 'POST') {
    const body = req.body as { email: string; password: string };
    const user = mockUsers.find(u => u.email === body.email && u.password === body.password);
    //najde uporabnika
    if (user) {
      return of(new HttpResponse({
      
        status: 200, //OK
        body: {
          token: 'mock-jwt-token-' + Date.now(),
          email: user.email,
          message: 'Prijava uspešna'
        }
      })).pipe(delay(300)); //časovni zamik
    } else { //ni uporabnika
      return throwError(() => new HttpErrorResponse({
        status: 401,
        statusText: 'Unauthorized',
        error: { message: 'Napačen email ali geslo' }
      })).pipe(delay(300));
    }

  }

  //signup, dodamo novega uporabnika dokler se stran ne osveži
  if (req.url.includes('/api/signup') && req.method === 'POST') {
    const body = req.body as { email: string; password: string };

    //ali je mail že registriran
    if (mockUsers.some(u => u.email === body.email)) {
      return of(new HttpResponse({
        status: 400,
        body: { message: 'Uporabnik že obstaja' }
      })).pipe(delay(300));
    }
    //če ni mail registriran ga doda v RAM
    mockUsers.push({ email: body.email, password: body.password });
    return of(new HttpResponse({
      status: 201,
      body: { message: 'Registracija uspešna', email: body.email }
    })).pipe(delay(300));
  }

  //items
  if (req.url.includes('/api/items') && req.method === 'GET') {
  

    if (!authService.getToken()){
      return throwError(() => new HttpErrorResponse({
      status: 401,
      statusText: 'Unauthorized',
      error: { message: 'Potrebna je prijava' }
    }));
  }
    

    return of(new HttpResponse({ //ustvari observable
      status: 200,
      body: itemsData //celotna datoteka
    })).pipe(delay(200));
  }

  // Če je karkoli druga ne bo interceptu
  return next(req);

};

// ČE BI IMELA BACKEND
/*@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthentificationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

  //pridobivanje žetona preko servisa
    const token = this.authService.getToken();

    //če ni žetona se pošlje naprej request brez sprememb
    if (!token ) {
      return next.handle(req);
    }

    // če je žeton potem interceptor v header doda žeton
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(authReq);
  }
}*/