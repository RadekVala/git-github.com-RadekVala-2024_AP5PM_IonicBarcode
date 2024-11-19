import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { UpcResponse } from "../model/upc-response";

@Injectable({
  providedIn: "root",
})
export class UpcService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getData(barcode: string): Observable<UpcResponse> {
    const url = `${this.apiUrl}/${barcode}`;

    const header = new HttpHeaders({
      Authorization: `Bearer ${environment.apiKey}`,
    });

    return this.http.get<UpcResponse>(url, { headers: header });
  }
}
