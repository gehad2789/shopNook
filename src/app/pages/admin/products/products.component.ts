import { CommonModule } from '@angular/common';
import { Component, viewChild ,OnInit} from '@angular/core';
import { FormsModule, ReactiveFormsModule , NgForm} from '@angular/forms';
import { ProductService } from '../../../services/productservice/product.service';
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
      this.prdservice.getAllProducts().subscribe(
        (data: any) => {
          // Use Map to filter out products with duplicate image URLs
          const uniqueProducts = Array.from(
            new Map(data.map((item: any) => [item.productImageUrl, item])).values()
          );
          /**data.map((item) => [item.imgUrl, item]) → Creates key-value pairs with imgUrl as the key.
  new Map(...).values() → Removes duplicates because Map only keeps unique keys.
  Array.from(...) → Converts back to an array. */
    
          this.prdList = uniqueProducts.sort(()=>Math.random()-0.5);
        },
        error => console.error('Error fetching products:', error)
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
            panelClass: ['snackbar-success'],
            horizontalPosition: 'center', // Center horizontally
            verticalPosition: 'top',     // At the top of the page
          });
          this.getAllProducts();
          // Reset the product form
          // this.productForm?.reset();
        } else if (res.error) {
          // Show error notification
          this.snackBar.open(res.message || 'Failed to add product', 'Close', {
            panelClass: ['snackbar-error'],
            horizontalPosition: 'center', // Center horizontally
            verticalPosition: 'top',     // At the top of the page
          });
        }
      },
      error: (err) => {
        console.error('Error saving product:', err);
        this.snackBar.open('An error occurred while saving the product', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
          horizontalPosition: 'center', // Center horizontally
          verticalPosition: 'top',     // At the top of the page
        });
      },
      complete: () => {
        console.log('Product save operation completed');
        console.log(this.productObj);
      },
    });
  }
  





  onedit(product:any){
    this.productObj=product;
    this.openSidepanal();

  };

  onUpdate(){
    this.prdservice.updateProduct().subscribe({
      next: (res: any) => {
        if (res) {
          // Show success notification
          this.snackBar.open('Updated  product successfully', 'Close', {
            panelClass: ['snackbar-success'],
            horizontalPosition: 'center', // Center horizontally
            verticalPosition: 'top',     // At the top of the page
          });
          this.getAllProducts();
          // Reset the product form
        } else if (res.error) {
          // Show error notification
          this.snackBar.open(res.message || 'Failed to update product', 'Close', {
            panelClass: ['snackbar-error'],
            horizontalPosition: 'center', // Center horizontally
            verticalPosition: 'top',     // At the top of the page
          });
        }
      },
      error: (err) => {
        console.error('Error updating product:', err);
        this.snackBar.open('An error occurred while updaing the product', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
          horizontalPosition: 'center', // Center horizontally
          verticalPosition: 'top',     // At the top of the page
        });
      },
      complete: () => {
        console.log('Product save operation completed');
        console.log(this.productObj);
      },
    });

  };


  ondelete(id:any){
    let isdelete=confirm('are u sure u want to delete it');
    if(isdelete){
      this.prdservice.deleteprdct(this.productObj.productId).subscribe((res:any)=>{
        if(res.result){
          this.snackBar.open('deleted product successfully', 'Close', {
            panelClass: ['snackbar-success'],
            horizontalPosition: 'center', // Center horizontally
            verticalPosition: 'top',     // At the top of the page
          });

        }else{
          this.snackBar.open('An error occurred while updaing the product', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
            horizontalPosition: 'center', // Center horizontally
            verticalPosition: 'top',     // At the top of the page
          });

        }
      })

    }
  }

  

  






  }
 

