import { Component } from '@angular/core';
import { ProductService } from '../../../services/productservice/product.service';
import { CommonModule, SlicePipe } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [CommonModule, SlicePipe, HeaderComponent, FooterComponent],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.css'
})
export class CustomerOrdersComponent {
  carouselProducts: any = [];
  suggestedProducts: any[] = [];

  constructor(private productService:ProductService,private cartserv:CartService) {}

  ngOnInit(): void {
    this.loadCarouselProducts();
    this.loadSuggestedProducts();
  }

  loadCarouselProducts(): void {
      this.carouselProducts=this.cartserv.getCart();

 
      
      
  
  }

  loadSuggestedProducts() {
    this.productService.getAllProducts().subscribe(
      (data: any) => {
        // Use Map to filter out products with duplicate image URLs
        const uniqueProducts = Array.from(
          new Map(data.map((item: any) => [item.productImageUrl, item])).values()
        );
        /**data.map((item) => [item.imgUrl, item]) → Creates key-value pairs with imgUrl as the key.
new Map(...).values() → Removes duplicates because Map only keeps unique keys.
Array.from(...) → Converts back to an array. */
  
        this.suggestedProducts = uniqueProducts.sort(()=>Math.random()-0.5);
        console.log("Filtered Suggested Products:", this.suggestedProducts);
      },
      error => console.error('Error fetching products:', error)
    );
  }
  
  

}
