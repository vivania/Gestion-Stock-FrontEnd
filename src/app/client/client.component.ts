import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { PanierService } from '../service/panier.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { Client } from '../model/client.model';
import { Panier } from '../model/panier.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  mode = 0;
  panelStyle = 'panel-default';
  public client: Client = {} as Client;
  panier: Panier;
  errorMsg = '';

  constructor(public orderService: OrderService,
              public panierSerice: PanierService,
              private authentService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
// tslint:disable-next-line: no-unused-expression
console.log(this.orderService.order, ' show the value');
  }

  onSaveClient(client: Client) {
    client.username = this.authentService.userAuthenticated.username;
    this.orderService.setClient(client);
    this.panierSerice.setClient(client);
    this.orderService.loadProductFromPanier();
    this.mode = 1;
  }

  public onOrder() {
    this.panierSerice.getPanier().client.id = 1;
    this.orderService.setClient(this.panierSerice.getPanier().client);
    console.log(this.panierSerice.getPanier().client.id = 1, ' Fetch the id of the order');

    this.orderService.submitOrder().subscribe( data => {
      this.orderService.order = data;
      this.orderService.loadProductFromPanier();
      this.panelStyle = 'panel-success';

    }, error => {
      console.log(error);
    });
  }

}
