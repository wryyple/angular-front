import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headersObj = new HttpHeaders({
      'Accept': 'application/json',
    });

    if (!!localStorage.getItem('token')) {
      headersObj = headersObj.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    }

    const clonedRequest = request.clone({
      headers: headersObj,
    })

    return next.handle(clonedRequest);
  }
}
