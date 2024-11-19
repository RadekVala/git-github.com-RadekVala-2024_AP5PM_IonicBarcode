import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { ApiResponse } from "../model/api_response";

@Injectable({
  providedIn: "root",
})
export class UpcService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Method to fetch data
  getData(search: string): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${search}?apikey=${environment.apiKey}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.apiKey}`, // Replace environment.apiKey with your actual token
    });

    return this.http
      .get<ApiResponse>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error("An error occurred:", error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`,
      );
    }
    return throwError(
      () => new Error("Something bad happened; please try again later."),
    );
  }
}
