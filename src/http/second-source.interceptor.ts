import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, mapTo, Observable, of, timeout } from 'rxjs';
import { books } from './data/books-source-second';

@Injectable()
export class SecondSourceInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url === '/second-book-source') {
      const response = new HttpResponse({
        body: books,
        status: 200,
      });

      return of(response).pipe(delay(5000));
    } else {
      return next.handle(req);
    }
  }
}
