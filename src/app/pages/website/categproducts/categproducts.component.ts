import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/productservice/product.service';
import { CommonModule, NgClass } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-categproducts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categproducts.component.html',
  styleUrl: './categproducts.component.css'
})
export class CategproductsComponent implements OnInit{
  filteredProducts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartserv:CartService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const categoryId = id !== null ? +id : 0; // Default to 0 or any other value if id is null
    console.log('Category ID from route:', categoryId);
  
    this.productService.getAllProducts().subscribe((products) => {
      console.log('All products:', products);
  
      this.filteredProducts = products.filter(
        (product:any) => product.categoryId === categoryId
      );
      console.log('Filtered products:', this.filteredProducts);
    });

  }

   // Add product to cart
   addtocart(product: any) {
    let addtocartobj = {
      // Data to be sent to the cart
      CartId: 0,
      CustId: 397,
      ProductId: product.productId,
      Quantity: 1,
      AddedDate: new Date(),
      productName: product.productName,
      productImageUrl: product.productImageUrl,
      productPrice: product.productPrice,
    };
    this.cartserv.addToCart(addtocartobj); // Add product to cart
    console.log('Product added to cart');
  }



}
