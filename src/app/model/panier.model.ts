
import { Client } from './client.model';
import { ProductItem } from './product-item';

export class Panier {

  public name: string;
  public item: Map<number, ProductItem> = new Map();
  public client: Client;

  constructor(name: string) {
    this.name = name;
  }

}
