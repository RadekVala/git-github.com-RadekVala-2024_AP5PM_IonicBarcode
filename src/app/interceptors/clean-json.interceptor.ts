import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class CleanJsonInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && typeof event.body === "string") {
          try {
            // Najít a extrahovat čistý JSON objekt
            const cleanBody = event.body.match(/\{.*\}/s)?.[0];
            if (cleanBody) {
              return event.clone({ body: JSON.parse(cleanBody) });
            }
          } catch (e) {
            console.warn("Invalid JSON data:", e);
          }
        }
        return event;
      }),
    );
  }
}
