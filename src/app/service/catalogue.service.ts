import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getResource(url: any): Observable<any> {
    return this.http.get(this.host + url);
  }

  getProduct(url: any): Observable<Product> {
    return this.http.get<Product>(url);
  }

  uploadProductPhoto(file: File, idProduct): Observable<HttpEvent<{}>> {
    const formatData: FormData = new FormData();
    formatData.append('file', file);
    const req = new HttpRequest('POST', this.host + '/uploadPhoto/' + idProduct, formatData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
}
