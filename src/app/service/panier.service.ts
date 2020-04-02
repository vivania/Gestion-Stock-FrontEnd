import { Injectable, OnInit } from '@angular/core';
import { Panier } from '../model/panier.model';
import { Product } from '../model/Product';
import { ProductItem } from '../model/product-item';
import { Location } from '@angular/common';
import { Order } from '../model/order';
import { Client } from '../model/client.model';



@Injectable({
  providedIn: 'root'
})
export class PanierService implements OnInit{

  currentPanierName = 'panier';
  public paniers: Map<string, Panier> = new Map();
  public digit: Panier;
  panierName = new Panier(this.currentPanierName);
  fullPanier: Panier;

  order: Order = new Order();


  //total: number;

  constructor(private location: Location) {
    const caddy = JSON.stringify(window.localStorage.getItem('mypanier'));

    if ( caddy ) {
       let value = JSON.stringify(this.getPanier());
       console.log('what is this value ', value);

    }
    this.paniers.set(this.currentPanierName, this.panierName);
    //this.savePanierToLocalStorage();
}

public check: number = 0;

ngOnInit() {
  this.check = JSON.parse(localStorage.getItem('mypanier'));
  if (!this.check) {}
}


  addProductToPanier(product: Product): void {
      this.fullPanier = this.paniers.get(this.currentPanierName);
      const productItem: ProductItem = this.fullPanier.item.get(product.id);

      if ( productItem ) {
        productItem.quantity += product.quantity;
    } else {
        let productItem = new ProductItem();
        console.log(productItem.id = product.id, ' chack id ');
        productItem.id = product.id;
        productItem.price = product.price;
        productItem.quantity = product.quantity;
        productItem.product = product;
        this.fullPanier.item[product.id] = productItem;
        this.fullPanier.item.set(product.id, productItem);
        this.savePanierToLocalStorage();
    }
  }

  setClient(client: Client) {
    this.getPanier().client = client;
    this.savePanierToLocalStorage();
    console.log( this.getPanier().client, 'Get all client');
  }

  public getPanier(): Panier {
    const caddy = this.paniers.get(this.currentPanierName);
    return caddy;
  }

  public getTotal(): number {
     let total = 0;
     const items: IterableIterator<ProductItem> = this.getPanier().item.values();
     for(const pi of items) {
       total += pi.price * pi.quantity;
    }
     return total;
  }

  savePanierToLocalStorage() {
    window.localStorage.setItem('mypanier', this.currentPanierName + ' ' + JSON.stringify(this.fullPanier));
  }

  public removeProductFromPanier(id: number): void {
   const panier = this.paniers.get(this.currentPanierName);
   panier.item.forEach((value: ProductItem, key: number) => {
      if (id === key) {
        panier.item.delete(key);
      }
    });
  }
}
