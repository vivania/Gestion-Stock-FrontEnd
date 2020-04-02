import { ProductItem } from './product-item';
import { Client } from './client.model';


export class Order {
  public id: number;
  public date: Date = new Date();
  public products: Array<ProductItem> = [];
  public client: Client = {id: null, name : '', username: '', address: '', email: '', phone: ''};
  public totalAmount: number;
}
