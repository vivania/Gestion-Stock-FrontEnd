import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogueService } from 'src/app/service/catalogue.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public currentProduct;
  mode = 0;
  editPhoto: boolean;
  progress: number;
  selectedFile: any;
  spinner: boolean;
  currentUploadFile: any;
  timeStamp: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public catalogService: CatalogueService,
    public authenService: AuthenticationService
    ) { }

  ngOnInit() {
    const url = atob(this.route.snapshot.params.url);
    this.catalogService.getProduct(url).subscribe( data => {
      this.currentProduct = data;
      console.log(this.currentProduct);
    }, error => console.log(error));
  }

  onEditProduct() {
    this.mode = 1;
  }

  onEditPhoto(product) {
    this.currentProduct = product;
    this.editPhoto = true;
  }

  onSelectedFile(event) {
  this.selectedFile = event.target.files;
  }

  onUploadPhoto() {
    this.progress = 0;
    this.spinner = true;
    this.currentUploadFile = this.selectedFile.item(0);
    this.catalogService.uploadProductPhoto(this.currentUploadFile, this.currentProduct.id)
    .subscribe(event => {
      if(event.type === HttpEventType.UploadProgress) {
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

  addProducToBasket() {

  }
  onUpdateProduct(value) {

  }

}
