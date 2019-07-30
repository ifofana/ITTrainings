import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor{

  constructor(
    private authService : AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
 
    let basicAuthHeaderString = this.authService.getAuthenticatedToken();

    let username = this.authService.getAuthenticatedUser();

    if(basicAuthHeaderString && username) {
      request = request.clone({
        setHeaders: {
          Authorization : basicAuthHeaderString
        }
      })
    }
    

    return next.handle(request);
  }
}
