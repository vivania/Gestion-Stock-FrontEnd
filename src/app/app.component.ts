import { Component, OnInit } from '@angular/core';
import { CatalogueService } from './service/catalogue.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';
import { PanierService } from './service/panier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private servCatalogue: CatalogueService,
    private route: ActivatedRoute,
    private router: Router,
    private autheService: AuthenticationService,
    public panierService: PanierService
    ) {}

  public categories: any;
  public currentCategory;

  ngOnInit(): void {
    this.autheService.loadAuthenticatedUserFromLocalStorage();
    this.getCatalogue();
  }

  getCatalogue(): any {
    this.servCatalogue.getResource('/categories')
    .subscribe(data => {
      this.categories = data;
    }, error => console.log(' ERROR ' + error));
  }

  getCurrentCategory(category) {
    this.currentCategory = category;
    this.router.navigateByUrl('/products/2/' + category.id);
  }

  onDesactiveCatalogue(){
    this.currentCategory = undefined;
    this.router.navigateByUrl('/products/1/0');
  }
  onProductPromo() {
    this.currentCategory = undefined;
    this.router.navigateByUrl('/products/3/0');
  }

  onProductDispo() {
    this.currentCategory = undefined;
    this.router.navigateByUrl('/products/4/0');
  }

  onLogout() {
    this.autheService.removeLocalStorageWhenLogout();
    this.router.navigateByUrl('login');
  }
}
