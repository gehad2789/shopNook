import { CommonModule } from '@angular/common';
import { Component, viewChild ,OnInit} from '@angular/core';
import { FormsModule, ReactiveFormsModule , NgForm} from '@angular/forms';
import { ProductService } from '../../../services/productservice/product.service';
import { LoginService } from '../../../services/loginservice/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule , ReactiveFormsModule, CommonModule ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  isSidePanalVisible:boolean=false;
  catList!:any[];
  prdList!:any[];
  productObj:any={
    "productId": 0,
  "productSku": " ",
  "productName": " ",
  "ProductPrice": 0,
  "productShortName": " ",
  "productDescription": " ",
  "createdDate": Date.now(),
  "deliveryTimeSpan": " ",
  "categoryId": 2147483647,
  "productImageUrl": " ",
  }

  constructor( private prdservice:ProductService,private snackBar: MatSnackBar){}//must add http client intp app.config.ts add provideHttpclient(), make a service to call api of categoties[producr]
  
  ngOnInit() {
    this.getAllCat()
    this.getAllProducts()
    
  }

  getAllCat() {
    this.prdservice.getAllCat().subscribe(
      (data: any) => this.catList = data.data,  //to accssess data.json
      error => console.error('Error fetching categories:', error)
    );
  };

  getAllProducts() {
    this.prdservice.getProduct().subscribe(
      (data: any) => this.prdList= data.data ,  //to accssess data.json
      error => console.error('Error fetching categories:', error)
    );

  }





  openSidepanal(){
    this.isSidePanalVisible=true;


  }

  closeSidepanal(){
    this.isSidePanalVisible=false;
  }


  onSaveprdct() {
    this.prdservice.saveProduct(this.productObj).subscribe({
      next: (res: any) => {
        if (res) {
          // Show success notification
          this.snackBar.open('Added new product successfully', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
          this.getAllProducts();

          // Reset the product object or form
          this.productObj = {}; // Resetting the product object
          // Optionally, reset a form group if using Angular forms
          // this.productForm.reset();
        } else if (res.error) {
          // Show error notification
          this.snackBar.open(res.message || 'Failed to add product', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      },
      error: (err) => {
        console.error('Error saving product:', err);
        this.snackBar.open('An error occurred while saving the product', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      complete: () => {
        console.log('Product save operation completed');
      },
    });
  }

  

  






  }
 

