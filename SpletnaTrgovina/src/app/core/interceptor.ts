import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthentificationService } from '../shared/services/authservice';

//NOVO:
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthentificationService);
  const token = authService.getToken();

  // Če ni tokena, pošlje naprej zahtevo brez sprememb (login, signup - ni tokenov)
  if (!token) {
    return next(req);
  }

  //če je token, doda header na kopijo
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return next(authReq);
};