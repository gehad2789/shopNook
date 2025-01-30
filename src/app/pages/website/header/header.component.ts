import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../../../services/productservice/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  productsList:any[]=[];
  catList$!:Observable<any>;
  catList:any=[];
  cartlist:any=[1];


  products: any[] = [];
  filteredProducts: any[] = [];
  categories: Set<string> = new Set();


  constructor( private prdservice:ProductService , private router:Router){
    prdservice.cartupdated$?.subscribe((res:any)=>{
      this.getcartdatabycusid();//trigger it whenever product added to be updated

    })
  }

  ngOnInit(): void {
    // this.getAllProducts()
    this.getallcat()

    this.prdservice.getAllProducts().subscribe((products) => {
      this.products = products;
      this.categories = new Set(products.map((p:any) => p.categoryName));
    });
  };


  filterByCategory(categoryName: string) {
    this.filteredProducts = this.products.filter(
      (product) => product.categoryName === categoryName
    );
  }




 getallcat(){
  this.prdservice.getProduct().subscribe(
    (data: any) => this.catList=data.data ,  //to accssess data.json
    error => console.error('Error fetching products:', error)
  );
 }

 navigate(id:number){
  this.router.navigate(['/catproducts',id])
 };
 

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
        this.cartlist=res;
        
      }))
     }

     deleteprdfromcart(id:number){
      this.prdservice.getcartDatabycustid(379).subscribe((res=>{
        if(res){
          this.cartlist=res;
          this.prdservice.cartupdated$?.next(true)
          alert('remover from cart')
  
        }
      }))
  
     }
    
     
    
  

 




}
