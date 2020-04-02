import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PanierService } from './panier.service';
import { CatalogueService } from './catalogue.service';
import { Order } from '../model/order';
import { ProductItem } from '../model/product-item';
import { Observable } from 'rxjs';
import { Client } from '../model/client.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

 public order: Order = new Order();

  constructor(
    private http: HttpClient,
    private panierService: PanierService,
    private catalogService: CatalogueService) { }

    setClient(client: Client) {
      this.order.client = client;
    }

    /*Run through all productItem in caddyService ! for each article
    found, Push them in product Order*/
   public loadProductFromPanier() {
      this.order.products = [];
// tslint:disable-next-line: forin
      for ( const key in this.panierService.getPanier().item) {
        console.log(this.panierService.getPanier().item[key], 'See all value in prodct Item');
        return this.order.products.push(this.panierService.getPanier().item[key]);
      }
    }

   public getCurrentTotal(): number {
      let total = 0;
      const items: IterableIterator<ProductItem> = this.panierService.getPanier().item.values();
      for (const p of Array.from(items)) {
        total += p.price * p.quantity;
      }
      return total;
    }

    submitOrder(): Observable<Order> {
      return this.http.post<Order>(this.catalogService.host + '/orders', this.order);
    }

    public getOrder(id: number): Observable<Order> {
      return this.http.get<Order>(this.catalogService.host + '/orders/' + id);
    }
}



