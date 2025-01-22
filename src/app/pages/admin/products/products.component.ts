import { CommonModule } from '@angular/common';
import { Component, viewChild ,OnInit} from '@angular/core';
import { FormsModule, ReactiveFormsModule , NgForm} from '@angular/forms';
import { ProductService } from '../../../services/productservice/product.service';
import { LoginService } from '../../../services/loginservice/login.service';
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

  constructor( private prdservice:ProductService){}//must add http client intp app.config.ts add provideHttpclient(), make a service to call api of categoties[producr]
  
  ngOnInit() {
    this.getAllCat()
    
  }

  getAllCat() {
    this.prdservice.getAllCat().subscribe(
      (data: any) => this.catList = data.data,  //to accssess data.json
      error => console.error('Error fetching categories:', error)
    );
  
    
  }



  openSidepanal(){
    this.isSidePanalVisible=true;


  }

  closeSidepanal(){
    this.isSidePanalVisible=false;
  }


  onSaveprdct(){
    this.prdservice.saveProduct(this.productObj).subscribe((res:any)=>{
      debugger;
      if(res.result){
        alert('added new product succsessfully')
      }else{
        alert(res.error)
        console.log('error')
      }

    })

  }
 
}
