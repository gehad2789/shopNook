import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/productservice/product.service';

@Component({
  selector: 'app-one-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './one-product.component.html',
  styleUrl: './one-product.component.css'
})
export class OneProductComponent {
  constructor(private cartserv:CartService,
    private route: ActivatedRoute,
    private productService: ProductService
  ){}


  productId: number | undefined;
  product: any;



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['productId'];  // Convert to number
      this.product = this.productService.getProductById(this.productId);
    });
  console.log(this.product)

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
    window.location.reload()
  }















  

}
