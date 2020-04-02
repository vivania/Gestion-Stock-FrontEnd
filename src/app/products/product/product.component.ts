import { Component, OnInit } from '@angular/core';
import { CatalogueService } from 'src/app/service/catalogue.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Product } from 'src/app/model/Product';
import { PanierService } from 'src/app/service/panier.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products;
  public editPhoto: boolean;
  public selectedFile: any;
  public currentProduct: any;
  progress: number;
  currentUploadFile: any;
  timeStamp: number;
  spinner = false;
  public title: string;

  constructor(
    public catalogService: CatalogueService,
    private route: ActivatedRoute,
    private router: Router,
    public authenService: AuthenticationService,
    private panierService: PanierService
    ) { }

  ngOnInit() {

    this.getAllProduct('/products/search/selectedProducts');

    //Fetch the url in Navigator
    this.router.events.subscribe((val) => {

      if(val instanceof NavigationEnd) {

        const url = val.url;
        console.log(url);

        const p1 = this.route.snapshot.params.p1;
        if( p1 == 1) {
          this.title = 'selection';
          this.getAllProduct('/products/search/selectedProducts');
          console.log(p1);

        } else if ( p1 == 2) {
          const idCategories = this.route.snapshot.params.p2;
          this.title = 'Produit produit de la categorie ' + idCategories;
          this.getAllProduct('/categories/' + idCategories + '/products');

        } else if ( p1 == 3) {
            this.title = 'Produit en promotion';
            this.getAllProduct('/products/search/promoProducts');

      } else if ( p1 == 4) {
          this.title = 'Produit disponible';
          this.getAllProduct('/products/search/dispoProducts');
          }
       }
    });
  }

  getAllProduct(url) {
    this.catalogService.getResource(url).subscribe(
      data => {
        this.products = data;
        console.log(this.products);
      }, error => console.log(error));
  }


  onEditPhoto(prod) {
    this.currentProduct = prod;
    this.editPhoto = true;
  }

  onselectedFile(event) {
    this.selectedFile = event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.spinner = true;
    this.currentUploadFile = this.selectedFile.item(0);
    this.catalogService.uploadProductPhoto(this.currentUploadFile, this.currentProduct.id)
    .subscribe(event => {
      if(event.type === HttpEventType.UploadProgress){
        this.progress = Math.round(100 * event.loaded / event.total);
        this.spinner = false;
      } else if (event instanceof HttpResponse) {
        alert('File loaded successfully');
        this.timeStamp = Date.now();
        console.log('check if ' + event.url);
        window.location.reload();
      }
    }, err => {
        alert('Data failled to load' + JSON.parse(err.error));
    });
    this.selectedFile = undefined;
  }
  //use TimeStamp to get actuall time of now
  getTs(){
    return Date.now();
  }

  onProductDetail(p: Product) {
    const url = btoa(p._links.product.href);
    this.router.navigateByUrl('product-detail/' + url);
  }

  onAddProductToPanier(product: Product) {
    this.panierService.addProductToPanier(product);
  }
}
