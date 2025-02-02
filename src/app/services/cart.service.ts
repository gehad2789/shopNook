import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class CartService {

  constructor(private httpclient:HttpClient) {
    this.loadCartFromLocalStorage(); // Load the cart data when the service is created
  }

  private cart: any[] = [];

  loadCartFromLocalStorage(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

  saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  
  clearCart(): void {
    this.cart = []; // Reset cart to an empty array
    this.saveCartToLocalStorage(); // Save the empty cart to localStorage
  }
  

  // Add to cart or update quantity if product already exists
  addToCart(product: any): void {
    const existingProduct = this.cart.find(item => item.ProductId === product.ProductId);

    if (existingProduct) {
      // If product exists, increase the quantity by 1
      existingProduct.Quantity += 1;
    } else {
      // If product doesn't exist, add it to the cart with quantity = 1
      this.cart.push({
        ...product,
        Quantity: 1, // Set initial quantity to 1
        AddedDate: new Date() // Set the added date
      });
    }

    this.saveCartToLocalStorage(); // Save to local storage
  }

  removeFromCart(productId: number): void {
    // Remove product by ProductId
    this.cart = this.cart.filter(item => item.ProductId !== productId);
    this.saveCartToLocalStorage(); // Save to local storage after removing
  }

  getCart(): any[] {
    return this.cart;
  }

  //checkout contries

  // contriesApi='https://restcountries.com/v3.1/all';
  contriesApi='https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/refs/heads/master/countries.json'
  getAllContries(){
    return this.httpclient.get<any[]>(this.contriesApi);


  }

  //get cities
  private geoNamesApiUrl = 'http://api.geonames.org/searchJSON'; // GeoNames API endpoint
  private username = 'YOUR_GEONAMES_USERNAME'; 
    // Fetch cities for a specific country (from GeoNames API)
    getCitiesByCountry(countryName: string): Observable<any> {
      const params = {
        q: countryName, // Country name
        maxRows: '10',  // Limit the number of results
        username: this.username // GeoNames username
      };
      return this.httpclient.get(this.geoNamesApiUrl, { params });
    }
  
}
