import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../../services/productservice/product.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule, SlicePipe } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-productshow',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SlicePipe],
  templateUrl: './productshow.component.html',
  styleUrl: './productshow.component.css',
})
export class ProductshowComponent implements OnInit {
  productsList: any[] = []; // all products fetched from the API
  catList: any = []; 
  cartlist: any = []; 
  visibleProducts: number = 12; 
  products: any[] = []; 
  filteredProducts: any[] = []; 
  categories: Set<string> = new Set(); 

  constructor(
    private prdservice: ProductService,
    private router: Router,
    private cartser: CartService
  ) {}

  ngOnInit(): void {
    this.getAllProducts(); // Fetch all products
    this.getproductbycatid(); // Fetch products by category ID
    this.getallcat(); // Fetch all categories
    this.cartser.loadCartFromLocalStorage(); // Load cart from local storage
  }

  // Filter products by category name
  filterByCategory(categoryName: string) {
    this.filteredProducts = this.products.filter(
      (product) => product.categoryName === categoryName
    );
  }

  // Fetch all products from the API
  getAllProducts() {
    this.prdservice.getProduct().subscribe(
      (data: any) => {
        this.productsList = data.data; // Assign fetched products to productsList
        this.products = data.data; // Assign fetched products to products (for filtering)
      },
      (error) => console.error('Error fetching products:', error)
    );
  }

  // Fetch products by category ID
  getproductbycatid() {
    this.prdservice.getProduct().subscribe((products) => {
      this.catList = Array.from(
        new Set(products.map((product: any) => product.categoryName))
      ).map((categoryName) => {
        const category = products.find(
          (product: any) => product.categoryName === categoryName
        );
        return { categoryId: category.categoryId, categoryName: categoryName };
      });
    });
  }

  // Navigate to category products page
  navigate(id: number) {
    this.router.navigate(['/catproducts', id]);
  }

  // Fetch all categories
  getallcat() {
    this.prdservice.getAllCat().subscribe(
      (data: any) => (this.catList = data.data), // Assign fetched categories to catList
      (error) => console.error('Error fetching products:', error)
    );
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
    this.cartser.addToCart(addtocartobj); // Add product to cart
    console.log('Product added to cart');
  }

  // Remove product from cart
  removeFromCart(productId: number): void {
    this.cartser.removeFromCart(productId);
    alert(`Product with ID ${productId} removed from cart!`);
  }

  // Show more products
  showMoreProducts() {
    this.visibleProducts += 8; // Increase the number of visible products by 6
  }
}