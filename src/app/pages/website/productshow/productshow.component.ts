import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../../services/productservice/product.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-productshow',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent],
  templateUrl: './productshow.component.html',
  styleUrl: './productshow.component.css'
})
export class ProductshowComponent implements OnInit{
  
    
   productsList:any[]=[];
    catList:any=[]
    cartlist:any=[];
    products: any[] = [];
  filteredProducts: any[] = [];
  categories: Set<string> = new Set();


 

  filterByCategory(categoryName: string) {
    this.filteredProducts = this.products.filter(
      (product) => product.categoryName === categoryName
    );
  }

  
    constructor( private prdservice:ProductService , private router:Router){}
  
    ngOnInit(): void {
      this.getAllProducts()
      this.getproductbycatid()
      this.getallcat()
      this.getcartdatabycusid()
      
    };
  
      getAllProducts() {
        this.prdservice.getProduct().subscribe(
          (data: any) => this.productsList=data.data ,  //to accssess data.json
          error => console.error('Error fetching products:', error)
        );
    }



    getproductbycatid(){
      this.prdservice.getProduct().subscribe((products) => {
        this.catList = Array.from(
          new Set(products.map((product:any) => product.categoryName))
        ).map((categoryName) => {
          const category = products.find(
            (product:any) => product.categoryName === categoryName
          );
          return { categoryId: category.categoryId, categoryName: categoryName };
        });
      });
    }
    navigate(id:number){
      this.router.navigate(['/catproducts',id])
     }



  

  
  
   getallcat(){
    this.prdservice.getProduct().subscribe(
      (data: any) => this.catList=data.data ,  //to accssess data.json
      error => console.error('Error fetching products:', error)
    );
   }

  
  
   //linked prdId at template 
   addtocart(prodid:any){
    let addtocartobj={//data come from api
      "CartId": 0,
      "CustId": 397,
      "ProductId": prodid,
      "Quantity": 1,
      "AddedDate": new Date()
    };
    this.prdservice.addTocart(addtocartobj).subscribe(
      (data: any) => console.log(data),  
      error => console.error('Error fetching products:', error)
    );
   }

   getcartdatabycusid(){
    this.prdservice.getcartDatabycustid(379).subscribe((res=>{
      if(res){
        this.cartlist=res;
        this.prdservice.cartupdated$?.next(true)
        // alert('added to cart')

      }
      
    }))
   }
   
   

}
