import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { from, map, Observable } from 'rxjs';
import { ProductService } from '../../../services/productservice/product.service';
import { CartService } from '../../../services/cart.service';

declare var bootstrap: any;

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


  constructor( private prdservice:ProductService , private router:Router, private carterv:CartService){
  }

  ngOnInit(): void {
    // this.getAllProducts()
    this.getproductbycatid()
    this.getallcat()
    //get cart list
    this.cartlist=this.carterv.getCart()

        // Activate tooltips
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
    


  };


  filterByCategory(categoryName: string) {
    this.filteredProducts = this.products.filter(
      (product) => product.categoryName === categoryName
    );
  }

  getproductbycatid(){
    // In the CategoryProductsComponent, we extract the categoryId from the route and filter products accordingly
    this.prdservice.getProduct().subscribe((products) => {
      this.catList = Array.from(
        new Set(products.map((product:any) => product.categoryName))
      ).map((categoryName) => {
        const category = products.find(
          (product:any) => product.categoryName === categoryName
        );
        return { categoryId: category.categoryId, categoryName: categoryName };
        /*To match products with their respective categories, we compare the categoryId of products with the categoryId in the categories list.
For each category, we attach the products that belong to it*/
      });
    });
  }




 getallcat(){
  this.prdservice.getAllCat().subscribe(
    (data: any) => this.catList=data.data ,  //to accssess data.json
    error => console.error('Error fetching products:', error)
  );
 }

 navigate(id:number){
  this.router.navigate(['/catproducts',id])
 };
 


  

  
  
     
    
     
    
  

 




}
