import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PanierService } from '../service/panier.service';
import { Router } from '@angular/router';
import { Panier } from '../model/panier.model';

@Component({
  selector: 'app-paniers',
  templateUrl: './paniers.component.html',
  styleUrls: ['./paniers.component.css']
})
export class PaniersComponent implements OnInit {

  //public paniers: Panier;

  constructor(public panierService: PanierService, private router: Router) { }

  ngOnInit() {
   this.panierService.getPanier();
  }


  newOrder() {
    this.router.navigateByUrl('/client');
  }
}
